# The Watching Labyrinth Project Brief

## One-Sentence Vision

Build a playable browser dungeon game where an unseen watcher studies the player's behavior, redirects them through a shifting labyrinth, and adapts each room using gameplay telemetry.

## Why This Project Exists

This project is meant to build practical computer science experience across game programming, frontend development, backend APIs, databases, analytics, and applied AI.

The goal is not just to make a game. The goal is to make a small interactive system where gameplay creates data, the system learns from that data, and the player experience changes because of it.

The game concept is now centered on a medieval labyrinth. The player is trying to escape, but the rooms begin to feel familiar in unsettling ways. Something is watching, learning, and redirecting the player into rooms that respond to how they play.

## Resume Story

Potential resume bullet:

> Built a full-stack adaptive browser game using TypeScript, React, Phaser, and PostgreSQL; collected gameplay telemetry, visualized player behavior, and adjusted dungeon difficulty using player-performance analysis.

## Current Version

Milestone 1 is started:

- React + TypeScript frontend
- Phaser game scene
- Keyboard movement with WASD and arrow keys
- Dungeon room boundary
- Collectible cores
- Local event log showing early telemetry

## Target Experience

The finished project should let someone:

1. Open the game in a browser.
2. Play through a sequence of dungeon rooms.
3. Generate gameplay events while playing.
4. View analytics about the session.
5. See the watcher change future rooms based on performance.

## Core Game Loop

The planned room loop:

1. Enter a room.
2. Fight enemies or survive hazards.
3. Collect a key, core, or escape fragment.
4. Unlock the exit.
5. Receive a room performance score.
6. Gain a reward based on performance.
7. Increase escape progress.
8. Let the watcher adapt the next room.

The player should feel like good performance creates both opportunity and danger. The watcher may escalate the labyrinth, but the player should also earn better rewards and progress faster.

## Core Systems

### Game

- 2D dungeon room
- Player movement
- Collectibles or objectives
- Enemies or hazards
- Health and damage
- Weapons or attacks
- Win/loss state
- Multiple difficulty settings

### Progression

Core values to track:

- `performance_score`: how well the player handled the current room
- `watcher_attention`: how aggressively the labyrinth responds
- `escape_progress`: how close the player is to escaping
- `reward_tier`: quality of reward earned from the room

The important design rule:

- Playing poorly may make the next room easier, but gives weaker rewards.
- Playing well may make the next room harder, but gives stronger rewards and faster escape progress.

### Telemetry

Events the game may record:

- `level_started`
- `player_moved`
- `core_collected`
- `enemy_defeated`
- `enemy_hit_player`
- `player_damaged`
- `player_died`
- `level_completed`
- `reward_granted`
- `difficulty_adjusted`

### Backend

Planned responsibilities:

- Receive gameplay events
- Store sessions and events
- Calculate basic player metrics
- Return difficulty recommendations

### Database

Planned tables:

- `players`
- `sessions`
- `events`
- `difficulty_recommendations`

### AI / Adaptive Logic

Start simple before using heavier AI:

- Score player skill from deaths, damage, completion time, and collected items.
- Classify session as `struggling`, `steady`, `strong`, or `dominant`.
- Adjust enemy speed, enemy count, health pickups, room layout pressure, or hazard density.

Example watcher responses:

- Player takes lots of damage: add a health pickup and reduce enemy speed.
- Player clears room quickly: add an enemy and reduce pickups.
- Player avoids combat: add a ranged enemy or block easy paths.
- Player stands still often: add a pursuing enemy.

These responses should not replace rewards. They tune challenge while the reward system still encourages strong play.

Possible later upgrades:

- ML model for player-skill classification
- LLM-generated post-game coaching summary
- Procedural room generation based on player performance

## Milestones

### Milestone 1: Playable Room

- [x] Create React + TypeScript app
- [x] Add Phaser
- [x] Add player movement
- [x] Add collectibles
- [x] Show local telemetry preview
- [ ] Replace placeholder player with sprite
- [ ] Clean up unused starter assets

### Milestone 2: Game Mechanics

- [ ] Add hazards or enemies
- [ ] Add health
- [ ] Add a basic attack or weapon
- [ ] Add game-over state
- [ ] Add restart button
- [ ] Add level-complete screen

### Milestone 3: Backend API

- [ ] Create backend folder
- [ ] Add API server
- [ ] Add event ingestion endpoint
- [ ] Send game events from frontend to backend

### Milestone 4: Database

- [ ] Add PostgreSQL setup
- [ ] Design event schema
- [ ] Store sessions and gameplay events
- [ ] Add seed/demo data

### Milestone 5: Analytics Dashboard

- [ ] Show completion rate
- [ ] Show average time
- [ ] Show damage/deaths
- [ ] Show session history
- [ ] Show current difficulty recommendation

### Milestone 6: Adaptive Difficulty

- [ ] Create player performance score
- [ ] Add watcher attention
- [ ] Add reward tiers
- [ ] Return difficulty recommendation
- [ ] Modify next level based on recommendation
- [ ] Log each difficulty adjustment

## Scoring and Rewards

The scoring model should separate player performance from difficulty adaptation.

Example room score:

```txt
Start: 50 points

+ 10 for each core collected
+ 8 for each enemy defeated
+ 15 for finishing the room
+ up to 20 for finishing quickly
+ up to 15 for high remaining health

- 2 for each damage taken
- 10 for dying
- up to 15 for standing still too much
```

Example score tiers:

```txt
0-39: Struggling
40-69: Steady
70-89: Strong
90-100: Dominant
```

Example result mapping:

```txt
Struggling:
  Threat Level -1
  Reward: survival aid

Steady:
  Threat Level stays similar
  Reward: normal loot

Strong:
  Threat Level +1
  Reward: better loot

Dominant:
  Threat Level +2
  Reward: rare loot or shortcut progress
```

Possible rewards:

- health pickup
- max health increase
- faster movement or dash cooldown
- weapon upgrade
- temporary shield
- map fragment
- key shard
- bonus escape progress

### Milestone 7: Polish and Portfolio

- [ ] Improve visual style
- [ ] Add screenshots or GIF
- [ ] Improve README
- [ ] Deploy frontend
- [ ] Add final resume bullet

## Brainstorming Notes

Game theme ideas:

- Medieval labyrinth escape
- Unseen watcher or dungeon master
- Shifting rooms that feel familiar but different
- Combat-focused room clearing with adaptive pressure

Possible player characters:

- Knight
- Mage
- Prisoner trying to escape
- Failed adventurer being tested by the labyrinth

Possible difficulty adjustments:

- Enemy speed
- Enemy count
- Health pickup frequency
- Core count
- Timer length
- Hazard density
- Ranged enemy presence
- Blocked paths

Possible weapon directions:

- Melee only
- Ranged only
- Both melee and ranged
- Sword, spear, bow, magic bolt, or short dash attack

## Decisions

- Working title: The Watching Labyrinth.
- Theme direction: medieval dungeon/labyrinth where the player is watched and redirected.
- Gameplay direction: more combat-focused than puzzle-focused for the first version.
- Use TypeScript + Phaser instead of Unity for easier web deployment and stronger full-stack resume value.
- Use `frontend/public/assets` for Phaser runtime-loaded game assets.
- Keep the first version simple and expand in milestones.

## Open Questions

- Should the game be more action-based, puzzle-based, or a mix?
- Should weapons be melee, ranged, or both?
- What should strong rewards look like?
- Should the AI be traditional ML, rule-based first, or LLM-assisted?
- Should users have accounts, or should sessions be anonymous at first?
- What visual style should the game use?
