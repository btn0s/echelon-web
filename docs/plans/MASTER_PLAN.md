# Echelon Master Plan

> **Purpose**: Strategic roadmap for building Echelon prototypes. Each phase builds on the last. Each milestone is a frozen, documented artifact.

---

## Vision

**6-month goal**: Playable vertical slice demonstrating core stealth loop  
**12-month goal**: Polished demo ready for player feedback  
**18-month goal**: Port learnings to Unity/Unreal for production

---

## Phase 0: Foundation (Current - Week 1-2)

### Objective
Set up infrastructure for 10x agentic development speed.

### Milestones

| ID | Milestone | Deliverable | Status |
|----|-----------|-------------|--------|
| 0.1 | Repo structure | Turborepo monorepo with apps/packages/docs | Done |
| 0.2 | Research synthesis | docs/research/* populated | Done |
| 0.3 | Knowledge base | docs/knowledge-base/* with context files | In Progress |
| 0.4 | Agentic tooling | Skills, templates, automations defined | In Progress |
| 0.5 | Proto template | Base R3F app template for all prototypes | Pending |

### Knowledge Dependencies
- `docs/knowledge-base/patterns/r3f-game-architecture.md`
- `docs/knowledge-base/systems/player-controller.md`
- `docs/knowledge-base/skills/echelon-skills.md`

---

## Phase 1: Movement (Week 2-4)

### Objective
Nail the feel of tactical stealth movement.

### Prototype: `proto-01-movement`

| ID | Milestone | Deliverable | Validation |
|----|-----------|-------------|------------|
| 1.1 | Basic controller | ecctrl fork with R3F integration | Character moves |
| 1.2 | Speed tiers | 4 distinct speeds (crouch-slow → sprint) | Each feels different |
| 1.3 | Posture system | Standing/crouching/prone with transitions | Smooth, responsive |
| 1.4 | Camera polish | Third-person with collision, feels tactical | No jank |
| 1.5 | Test environment | Level geometry for all movement scenarios | Covers edge cases |
| 1.6 | Input support | Keyboard + gamepad working | Both feel good |
| 1.7 | Documentation | LEARNINGS.md with findings | Decisions captured |

### Knowledge Dependencies
- `docs/knowledge-base/systems/player-controller.md`
- `docs/knowledge-base/systems/input-system.md`
- `docs/knowledge-base/references/ecctrl-api.md`

### Success Criteria
- [ ] Can navigate tight spaces confidently
- [ ] Speed/posture changes feel deliberate, not instant
- [ ] No physics jank on slopes, stairs, obstacles
- [ ] Feels like "tactical operator", not "floaty action hero"

---

## Phase 2: Visibility (Week 4-6)

### Objective
Implement light/shadow detection system.

### Prototype: `proto-02-light-shadow`

| ID | Milestone | Deliverable | Validation |
|----|-----------|-------------|------------|
| 2.1 | Light sampling | Raycast-based visibility calculation | Accurate in test scenes |
| 2.2 | Light meter UI | Real-time visibility indicator | Responsive, readable |
| 2.3 | Shadow detection | Player hidden in dark areas | Binary works first |
| 2.4 | Light interaction | Shoot out lights, toggle switches | Affects visibility |
| 2.5 | Performance | 60fps with dynamic lighting | Profile and optimize |
| 2.6 | Documentation | LEARNINGS.md | Decisions captured |

### Knowledge Dependencies
- `docs/knowledge-base/systems/visibility-system.md`
- `docs/knowledge-base/patterns/light-sampling.md`
- `docs/research/splinter-cell/mechanics-deep-dive.md` (light meter section)

---

## Phase 3: Sound (Week 6-8)

### Objective
Implement noise generation and propagation.

### Prototype: `proto-03-sound`

| ID | Milestone | Deliverable | Validation |
|----|-----------|-------------|------------|
| 3.1 | Noise generation | Speed + surface = noise level | Predictable formula |
| 3.2 | Sound propagation | Noise radius, wall occlusion | Spatial accuracy |
| 3.3 | Ambient masking | Environmental noise masks player | Rain/machinery works |
| 3.4 | Audio feedback | Footstep sounds per surface | Player hears difference |
| 3.5 | Sound monitor UI | Noise level vs ambient indicator | Like SC's aural monitor |
| 3.6 | Documentation | LEARNINGS.md | Decisions captured |

### Knowledge Dependencies
- `docs/knowledge-base/systems/sound-system.md`
- `docs/knowledge-base/patterns/sound-propagation.md`
- `docs/research/splinter-cell/mechanics-deep-dive.md` (sound section)

---

## Phase 4: Enemy Perception (Week 8-10)

### Objective
AI that sees and hears based on player visibility/noise.

### Prototype: `proto-04-enemy-perception`

| ID | Milestone | Deliverable | Validation |
|----|-----------|-------------|------------|
| 4.1 | Vision cones | Configurable FOV, range, falloff | Visualized in debug |
| 4.2 | Sight detection | Uses visibility system | Dark = hidden |
| 4.3 | Sound detection | Uses sound system | Quiet = hidden |
| 4.4 | Awareness states | Unaware → Suspicious → Alert | Clear transitions |
| 4.5 | Detection feedback | UI shows when being detected | Player understands |
| 4.6 | Documentation | LEARNINGS.md | Decisions captured |

### Knowledge Dependencies
- `docs/knowledge-base/systems/ai-perception.md`
- `docs/knowledge-base/patterns/awareness-states.md`
- `docs/research/stealth-design/psychology-and-theory.md` (AI section)

---

## Phase 5: Patrol AI (Week 10-12)

### Objective
Enemies with believable patrol and investigation behavior.

### Prototype: `proto-05-patrol-ai`

| ID | Milestone | Deliverable | Validation |
|----|-----------|-------------|------------|
| 5.1 | Patrol routes | Waypoint-based movement | Predictable patterns |
| 5.2 | Investigation | Go to last known position | Believable search |
| 5.3 | Return to patrol | After timeout, resume route | Not permanent alert |
| 5.4 | Communication | Guards alert nearby guards | Local, not global |
| 5.5 | Memory | Guards remember disturbances | Heightened alert |
| 5.6 | Documentation | LEARNINGS.md | Decisions captured |

### Knowledge Dependencies
- `docs/knowledge-base/systems/ai-behavior.md`
- `docs/knowledge-base/patterns/patrol-system.md`
- `docs/knowledge-base/patterns/behavior-trees.md`

---

## Phase 6: Integration (Week 12-16)

### Objective
Combine all systems into playable stealth loop.

### Prototype: `proto-06-integration`

| ID | Milestone | Deliverable | Validation |
|----|-----------|-------------|------------|
| 6.1 | System integration | All systems working together | No conflicts |
| 6.2 | Test level | Dense indoor environment | Multiple routes |
| 6.3 | Objective system | Simple "reach point" objective | Complete loop |
| 6.4 | Failure state | Detection = restart | Clear feedback |
| 6.5 | Success state | Reach objective undetected | Satisfying completion |
| 6.6 | Playtesting | Internal testing, iterate | Fun to play |
| 6.7 | Documentation | Full system documentation | Ready for port |

### Knowledge Dependencies
- All previous system docs
- `docs/knowledge-base/patterns/system-integration.md`

---

## Dependency Graph

```
Phase 0: Foundation
    │
    ▼
Phase 1: Movement ──────────────────────┐
    │                                   │
    ▼                                   │
Phase 2: Visibility ─────┐              │
    │                    │              │
    ▼                    │              │
Phase 3: Sound ──────────┼──────────────┤
    │                    │              │
    ▼                    ▼              │
Phase 4: Enemy Perception (needs 2+3)   │
    │                                   │
    ▼                                   │
Phase 5: Patrol AI (needs 4)            │
    │                                   │
    ▼                                   ▼
Phase 6: Integration (needs all)
```

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Web performance insufficient | Medium | High | Profile early, bake lighting, LOD |
| ecctrl too floaty for stealth | Medium | Medium | Fork and tune, or build custom |
| Dynamic lighting too expensive | High | High | Hybrid baked + limited dynamic |
| Scope creep per prototype | High | Medium | Strict AGENTS.md scope, freeze discipline |
| AI behavior too complex | Medium | Medium | Start simple (FSM), add complexity if needed |

---

## Resource Allocation

### Tools
- **Claude Code**: Complex multi-file changes, system implementation
- **Cursor**: Quick edits, debugging, exploration
- **Manual**: Design decisions, playtesting, creative direction

### Time Budget per Prototype
- 40% Implementation
- 20% Testing/debugging
- 20% Polish/iteration
- 20% Documentation

---

## Decision Log

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|------------------------|
| 2026-02-03 | Use ecctrl as base | Saves 2-3 weeks vs custom | Custom controller, rapier-fps |
| 2026-02-03 | Turborepo monorepo | Prototype isolation + sharing | Nx, single repo |
| 2026-02-03 | Start with Zustand | Simplicity for early protos | ECS from start |
| 2026-02-03 | Freeze-fork pattern | Clean iteration history | Branch-based |

---

## Next Actions

1. Complete knowledge base structure (Phase 0.3)
2. Create proto template package (Phase 0.5)
3. Begin proto-01-movement implementation (Phase 1.1)
