const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/models', express.static(path.join(__dirname, 'public', 'models')));
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Allow CORS for the Vite dev server
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const players = {};
const MAX_HP = 100;
const spawnPoints = [
  { x: 0, y: 8, z: 0 },
  { x: 18, y: 8, z: 16 },
  { x: -18, y: 8, z: -16 },
  { x: 24, y: 8, z: -8 },
  { x: -24, y: 8, z: 8 },
  { x: 8, y: 8, z: -24 },
  { x: -8, y: 8, z: 24 }
];

function pickSpawn() {
  return spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
}

function publicPlayers() {
  return players;
}

function emitLobbyStats() {
  io.emit('lobbyStats', {
    online: Object.keys(players).length,
    players: publicPlayers()
  });
}

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Initialize new player
  players[socket.id] = {
    id: socket.id,
    name: `Soldier_${socket.id.slice(0, 4)}`,
    position: pickSpawn(),
    rotation: { x: 0, y: 0, z: 0 },
    health: MAX_HP,
    kills: 0,
    deaths: 0,
    state: 'idle',
    isDead: false
  };

  // Sync current state
  socket.emit('currentPlayers', players);
  socket.broadcast.emit('playerJoined', players[socket.id]);
  emitLobbyStats();

  socket.on('playerProfile', (profile = {}) => {
    if (!players[socket.id]) return;
    players[socket.id].name = String(profile.name || players[socket.id].name).slice(0, 16);
    players[socket.id].loadout = profile.loadout || players[socket.id].loadout;
    emitLobbyStats();
  });

  // Movement
  socket.on('playerMovement', (movementData) => {
    if (players[socket.id] && !players[socket.id].isDead) {
      players[socket.id].position = movementData.position;
      players[socket.id].rotation = movementData.rotation;
      players[socket.id].state = movementData.state;
      socket.broadcast.emit('playerMoved', players[socket.id]);
    }
  });

  // Combat: Handle Shooting
  socket.on('playerShoot', (hitData) => {
    if (players[socket.id] && !players[socket.id].isDead) {
      // Broadcast muzzle flash/sound effect to others
      socket.broadcast.emit('playerFired', {
        id: socket.id,
        origin: hitData.origin,
        end: hitData.end
      });

      // If a player was hit
      if (hitData.targetId && players[hitData.targetId] && !players[hitData.targetId].isDead) {
        const target = players[hitData.targetId];
        const baseDamage = Math.max(1, Math.min(Number(hitData.damage) || 25, 120));
        const damage = hitData.headshot ? Math.round(baseDamage * 1.8) : baseDamage;
        target.health -= damage;

        if (target.health <= 0) {
          target.health = 0;
          target.isDead = true;
          target.deaths += 1;
          players[socket.id].kills += 1;

          // Notify everyone of the kill
          io.emit('playerKilled', {
            killerId: socket.id,
            victimId: target.id,
            damage,
            headshot: !!hitData.headshot,
            killerStats: players[socket.id],
            victimStats: target
          });
          emitLobbyStats();

          // Respawn the dead player after 3 seconds
          setTimeout(() => {
            if (players[target.id]) {
              players[target.id].health = MAX_HP;
              players[target.id].isDead = false;
              players[target.id].position = pickSpawn();
              io.emit('playerRespawned', players[target.id]);
              emitLobbyStats();
            }
          }, 3000);
        } else {
          // Notify the target they took damage
          io.emit('playerDamaged', {
            id: target.id,
            attackerId: socket.id,
            health: target.health,
            damage,
            headshot: !!hitData.headshot
          });
          emitLobbyStats();
        }
      }
    }
  });

  // Handle Disconnect
  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit('playerDisconnected', socket.id);
    emitLobbyStats();
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`BulletStorm Arena Server running on port ${PORT}`);
});
