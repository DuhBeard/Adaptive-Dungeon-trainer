# Adaptive Dungeon Trainer

An adaptive browser game project for practicing game programming, frontend engineering, telemetry, databases, and AI-driven difficulty tuning.

## Current Milestone

- React + TypeScript frontend
- Phaser game scene
- Player movement with WASD or arrow keys
- Collectible cores
- Local telemetry preview for gameplay events

## Run Locally

```bash
cd frontend
npm install
npm run dev
```

Then open the localhost URL printed by Vite.

## Planned Structure

```txt
frontend/   React + Phaser game and dashboard
backend/    API for telemetry and adaptive difficulty
database/   schema, migrations, and seed data
docs/       architecture notes and screenshots
```

## Next Milestones

1. Add hazards, enemies, health, and game-over state.
2. Add backend API for gameplay event logging.
3. Store sessions and events in PostgreSQL.
4. Build analytics dashboard.
5. Add adaptive difficulty scoring.
