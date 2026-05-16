# BulletStorm Arena (SkillWarz Clone) - Advanced Project Plan

## Project Overview
A fast-paced, competitive first-person shooter (FPS) designed for browser environments. It features advanced movement mechanics, skill-based gunplay, real 3D models, and a robust real-time multiplayer backend. 

## Core Architecture

### 1. Frontend (Client)
- **3D Engine:** Three.js (Optimized for 60+ FPS across devices).
- **UI Framework:** HTML5/CSS3 with Vanilla JS (Premium glassmorphic aesthetic).
- **Physics:** Cannon-es or lightweight custom AABB collision to ensure smooth, high-framerate performance on low-end devices.
- **Asset Pipeline:** 
  - Using strictly **Real 3D Models** (GLTF/GLB formats). No basic geometric shapes (cubes/spheres) will be used for final assets.
  - I will source high-quality free models (weapons, characters, maps) from reliable CDNs, or we can use models you provide.

### 2. Backend (Server)
- **Framework:** Node.js with Express.
- **Networking:** Socket.io (or Colyseus) for low-latency, real-time multiplayer synchronization.
- **Server Authority:** The server will validate movement and hit detection to prevent cheating while utilizing client-side prediction for smooth gameplay without lag.

## Performance & Optimization Strategy
To guarantee 60 FPS and cross-device compatibility:
1. **Asset Optimization:** All textures compressed, models will use LOD (Level of Detail) where necessary.
2. **Rendering:** Frustum culling, InstancedMeshes for repeated objects (like bullets or environmental props).
3. **Tick Rate:** Server will run at a steady tick rate (e.g., 20-30 ticks per second) with the client interpolating positions to render at 60+ FPS.

---

## Development Phases

### Phase 1: Engine Foundation & Multiplayer Setup (CURRENT)
- Set up Node.js server with Socket.io.
- Establish the client-server connection.
- Synchronize basic player positions and states across the network.

### Phase 2: High-Quality Asset Integration
- Load a real `.glb` character model.
- Load real `.glb` weapon models.
- Set up a visually stunning map (cyberpunk/neon arena style).
- Implement First-Person camera logic attached to the 3D model.

### Phase 3: Core Gameplay Mechanics
- Advanced Movement: Sprinting, sliding, jumping, and crouch mechanics.
- Shooting Logic: Raycasting from the camera center, hit detection validated by the server.
- Recoil, bullet spread, and weapon firing animations.

### Phase 4: UI Integration & Game Loop
- Connect the massive HTML/CSS UI we built to the game engine.
- Implement Health/Damage systems, Kill Feed, and Scoreboard.
- Create game modes (Deathmatch, Team Deathmatch).

## Next Immediate Steps
1. We will initialize the backend server (`server.js`) and install Socket.io.
2. We will set up the foundational multiplayer sync logic so multiple clients can connect simultaneously.
3. Once networking is stable, we'll implement our first real 3D models.

## Run The Current Playable Alpha

1. Build the client:
   ```bash
   npm run build
   ```
2. Start the multiplayer server:
   ```bash
   npm run server
   ```
3. Open:
   ```text
   http://localhost:3000
   ```

Controls: WASD move, mouse aim, left click fire, right click aim, R reload, Shift sprint, C slide, Space jump, 1/2/3 switch weapons, Tab scoreboard.

