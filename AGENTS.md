# Echelon - Global Agent Context

> **Read this file first.** It provides the context needed to work effectively on this project.

## What Is This Project?

**Echelon** is a tactical stealth game - a spiritual successor to Splinter Cell 1, 2, and Chaos Theory. We're building web-based prototypes to validate game mechanics before porting to Unity/Unreal.

**Core Fantasy**: You are a top-tier covert operative. Success = zero footprint. Professional, not heroic.

**This is NOT**: An action game, a power fantasy, or "Splinter Cell: Conviction/Blacklist"

---

## Design Pillars (Non-Negotiable)

| Pillar | What It Means | Anti-Pattern |
|--------|---------------|--------------|
| **Light & Shadow** | Visibility determined by lighting. Player controls exposure. | "Crouch in grass = invisible" |
| **Sound Discipline** | Speed + surface = noise. Noise attracts investigation. | Instant full alert on any sound |
| **Patient Tension** | Slow, deliberate, high-stakes. Planning > reacting. | Run-and-gun viable |
| **Fair AI** | Readable, predictable, exploitable patterns. | Psychic guards, random detection |
| **Mastery Loop** | Replay for cleaner execution, not just completion. | One "correct" path |

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| **Monorepo** | Turborepo + pnpm | Workspaces in `apps/` and `packages/` |
| **Rendering** | React Three Fiber | Declarative Three.js |
| **Physics** | Rapier (@react-three/rapier) | WASM-based, fast |
| **Character** | ecctrl (forked) | Customized for stealth |
| **State** | Zustand → Miniplex | Start simple, migrate to ECS if needed |
| **Future** | Unity/Unreal | Learnings inform C#/C++ port |

---

## Repository Structure

```
echelon/
├── apps/                           # Prototype applications
│   ├── proto-01-movement/          # Player movement system
│   │   ├── AGENTS.md               # Prototype-specific context
│   │   └── LEARNINGS.md            # Post-completion insights
│   └── proto-XX-name/              # Future prototypes
│
├── packages/                       # Shared code (extract when used 2+ times)
│   ├── @echelon/types/             # Shared TypeScript types
│   ├── @echelon/game-core/         # ECS, game loop, etc.
│   └── @echelon/stealth/           # Visibility, sound, detection
│
├── docs/
│   ├── research/                   # External research
│   │   ├── splinter-cell/          # SC mechanics analysis
│   │   ├── stealth-design/         # Design theory & psychology
│   │   └── web-tech/               # Web game architecture
│   ├── design/                     # Our design decisions
│   └── systems/                    # Technical documentation
│
├── GDD.md                          # Game Design Document
└── AGENTS.md                       # This file
```

---

## Prototype Workflow

### Iteration Pattern: Freeze & Fork

```
1. CREATE   →  apps/proto-XX-name/
2. BUILD    →  Focused experiment (ONE system)
3. DOCUMENT →  LEARNINGS.md with findings
4. FREEZE   →  Lock prototype (no more changes)
5. FORK     →  Copy to proto-XX+1, add next system
```

### Naming Convention

```
proto-{number}-{system}[-{variant}]

Examples:
  proto-01-movement
  proto-02-light-shadow
  proto-03-movement-light        # Combined systems
  proto-03-movement-light-v2     # Variant approach
```

### Each Prototype Must Have

- `AGENTS.md` - Scope, success criteria, decisions
- `LEARNINGS.md` - Post-completion insights (created when frozen)
- `README.md` - How to run it

---

## Key Research (Read Before Building)

| Document | Location | Summary |
|----------|----------|---------|
| **SC Mechanics** | `docs/research/splinter-cell/mechanics-deep-dive.md` | Light meter, sound, AI states, movement |
| **Player Sentiment** | `docs/research/splinter-cell/player-sentiment.md` | What fans loved/hated, community wishlist |
| **Design Psychology** | `docs/research/stealth-design/psychology-and-theory.md` | Tension/release, mastery, failure states |
| **Web Architecture** | `docs/research/web-tech/architecture.md` | R3F + Rapier + ECS patterns |

### Key Insights

**From SC Mechanics:**
- Light meter = real-time visibility feedback
- Sound monitor = player noise vs ambient noise
- 3 postures: standing, crouching, prone
- Speed affects noise exponentially

**From Player Sentiment:**
- "No Mark & Execute" is sacred
- Dense indoor levels > open world
- Vulnerability > power fantasy
- Fast restart essential for experimentation

**From Design Psychology:**
- 40/40/20 pacing: plan/execute/recover
- Close calls > perfect safety (dopamine)
- Failure must teach, not punish
- AI must feel fair, not omniscient

---

## Current Focus

**Phase**: Prototyping  
**Active**: `proto-01-movement`

### Prototype Roadmap

| # | Name | Focus | Status |
|---|------|-------|--------|
| 01 | Movement | Speed tiers, postures, feel | Active |
| 02 | Light/Shadow | Visibility system, light meter | Planned |
| 03 | Sound | Noise propagation, surfaces | Planned |
| 04 | Enemy Perception | Vision cones, hearing, states | Planned |
| 05 | Patrol AI | Routes, investigation, memory | Planned |
| 06 | Integration | Combined stealth loop | Planned |

---

## Agent Guidelines

### Before Starting Work

1. **Read the prototype's AGENTS.md** - Understand scope and constraints
2. **Check docs/research/** - Don't reinvent what's already researched
3. **Check docs/design/** - Follow established decisions
4. **Stay in scope** - If it's not in the prototype's scope, don't add it

### While Working

5. **One system at a time** - Prototypes are focused experiments
6. **Performance matters** - Target 60fps, profile early
7. **Document decisions** - Update AGENTS.md when making significant choices
8. **Surface tradeoffs** - When design conflicts with tech, ask

### After Completing Work

9. **Update LEARNINGS.md** - What worked, what didn't, recommendations
10. **Keep it frozen** - Don't modify completed prototypes

---

## What NOT to Do

### Design Anti-Patterns
- Action-oriented gameplay (Conviction/Blacklist style)
- "Mark and Execute" or similar automation
- Player as superhero (should feel vulnerable)
- Tension sacrificed for accessibility
- Unfair or random AI detection

### Technical Anti-Patterns
- Premature optimization before profiling
- Over-engineering ECS for simple prototypes
- Tight coupling between systems
- Ignoring web performance constraints
- Building features outside prototype scope

---

## Quick Reference

### Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Run all apps in dev mode
pnpm build            # Build all packages
pnpm --filter proto-01-movement dev  # Run specific prototype
```

### Key Files

| File | Purpose |
|------|---------|
| `GDD.md` | Game design vision |
| `AGENTS.md` | This file - global context |
| `apps/*/AGENTS.md` | Prototype-specific context |
| `apps/*/LEARNINGS.md` | Post-completion insights |
| `docs/research/*` | Background research |

---

## Agentic Development

> See `docs/plans/AGENTIC_DEVELOPMENT.md` for full strategy.

### Tool Selection

| Task | Tool | Why |
|------|------|-----|
| Multi-file implementation | **Claude Code** | Orchestration, context |
| New prototype setup | **Claude Code** | Scaffolding |
| Single file edits | **Cursor** | Speed |
| Quick debugging | **Cursor** | Inline fixes |
| Research + implement | **Claude Code** | Librarian → implement |

### Skills (skills.sh)

Browse **https://skills.sh/** for reusable agent skills. Install via:
```bash
npx skills add <skill-name>
```

Look for skills covering: R3F, Rapier, game input, state management.

### Delegation Patterns

```typescript
// Research then implement
delegate_task(subagent_type="librarian", run_in_background=true, ...)
// ... wait for research ...
delegate_task(category="visual-engineering", load_skills=["r3f-fundamentals"], ...)

// Parallel exploration
delegate_task(subagent_type="explore", run_in_background=true, prompt="Find X")
delegate_task(subagent_type="explore", run_in_background=true, prompt="Find Y")

// Architecture consultation
delegate_task(subagent_type="oracle", load_skills=["r3f-physics"], prompt="Review design...")
```

### Key Documents

| Document | Purpose |
|----------|---------|
| `docs/plans/MASTER_PLAN.md` | Strategic roadmap, phases, milestones |
| `docs/plans/AGENTIC_DEVELOPMENT.md` | Tool selection, skills, automation |
| `docs/knowledge-base/` | Internal patterns and references |
| `apps/proto-*/EXECUTION_PLAN.md` | Step-by-step implementation guide |

---

## Questions?

If something is unclear or you're facing a design/tech tradeoff:
1. Check if it's answered in docs/
2. Check if it's in the prototype's AGENTS.md
3. If not, **ask** - don't guess on important decisions
