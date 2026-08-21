# Contributing to BulletStorm Arena

Thank you for your interest in contributing to BulletStorm Arena! This document provides guidelines and instructions for contributing.

## How to Contribute

### Reporting Bugs

1. Check existing [issues](https://github.com/kamalesh404/multiplayer-fps-game/issues) to avoid duplicates
2. Open a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature, why it's useful, and how it should work

### Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test locally: `npm run build && npm run server`
5. Commit with a clear message
6. Push and open a Pull Request

## Development Setup

```bash
git clone https://github.com/your-username/multiplayer-fps-game.git
cd multiplayer-fps-game
npm install
npm run dev        # Start dev server
npm run server     # Start multiplayer server
```

## Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Keep functions focused and small
- Add comments for complex logic

## Pull Request Guidelines

- PR title should be descriptive (e.g., "Add double-jump mechanic")
- Reference related issues
- Describe what changed and why
- Include screenshots/video if visual changes

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
