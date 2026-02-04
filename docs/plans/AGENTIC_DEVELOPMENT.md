# Agentic Development Strategy

> How to use AI agents (Claude Code, Cursor) to build Echelon 10x faster.

---

## Skills Strategy

### Browse skills.sh

**https://skills.sh/** - The Agent Skills Directory by Vercel

Install skills via CLI:
```bash
npx skills add <skill-name>
```

### Skills to Look For

Browse skills.sh for skills in these categories:

| Category | Why We Need It | Search Terms |
|----------|----------------|--------------|
| **React Three Fiber** | Core rendering | r3f, three.js, 3d |
| **Rapier Physics** | Character controller, collisions | rapier, physics, collision |
| **Game Input** | Keyboard/gamepad handling | input, gamepad, controls |
| **State Management** | Zustand, ECS patterns | zustand, state, ecs |
| **Animation** | Character animation | animation, tween, spring |
| **Shaders/GLSL** | Light meter, effects | shader, glsl, webgl |

### Built-in Skills (Already Available)

Check what's already loaded in your agent:
- `r3f-fundamentals`, `r3f-physics`, `r3f-lighting`, etc.
- `frontend-ui-ux` for UI work
- `git-master` for version control

### Skill Loading Pattern

```typescript
// Load relevant skills when delegating
delegate_task(
  category="visual-engineering",
  load_skills=["r3f-fundamentals", "r3f-physics"],  // Load what's relevant
  prompt="..."
)
```

### Skills Worth Creating (Contribute to skills.sh)

If you build reusable patterns, consider contributing:

| Potential Skill | Domain | Would Help With |
|-----------------|--------|-----------------|
| `ecctrl-stealth` | Character controllers | Forked ecctrl patterns for stealth games |
| `rapier-sensors` | Physics | Detection zones, trigger volumes |
| `game-fsm` | AI/State | Finite state machines for game AI |
| `spatial-audio-r3f` | Audio | 3D positional audio in R3F |

**Rule**: Only create skills for patterns that are **reusable across projects**, not project-specific specs.

---

## Tool Selection: Cursor vs Claude Code

### Use Claude Code For:

| Task Type | Why Claude Code |
|-----------|-----------------|
| **Multi-file system implementation** | Orchestrates across files, maintains context |
| **New prototype setup** | Scaffolds entire directory structure |
| **Refactoring across files** | LSP-aware, safe renames |
| **Complex debugging** | Can run tests, check errors, iterate |
| **Research + implementation** | Librarian agents for docs, then implement |
| **When you need delegation** | Spawns specialized subagents |

**Example prompts for Claude Code:**
```
"Implement the posture system in proto-01. Should support standing/crouching/prone 
with collider swapping. Check ecctrl source for how to modify."

"Set up proto-02-light-shadow by copying proto-01 and adding visibility system. 
Research how SC did light meters first."
```

### Use Cursor For:

| Task Type | Why Cursor |
|-----------|------------|
| **Single file edits** | Faster for quick changes |
| **Exploring code** | Better for reading/understanding |
| **Quick debugging** | Inline error fixing |
| **Writing tests** | Focused, single-file work |
| **Documentation edits** | Markdown editing |
| **Learning/questions** | Conversational exploration |

**Example uses for Cursor:**
```
- "What does this useFrame hook do?"
- "Fix the TypeScript error on line 45"
- "Add a comment explaining this function"
- "Write a test for calculateNoiseLevel"
```

### Decision Flowchart

```
Is it a single file change?
├─ YES → Cursor
└─ NO → Does it need research first?
         ├─ YES → Claude Code (librarian → implement)
         └─ NO → Does it span 3+ files?
                  ├─ YES → Claude Code
                  └─ NO → Either works, prefer Cursor for speed
```

---

## Automations to Build

### 1. Prototype Scaffolding Script

```bash
# scripts/new-prototype.sh
# Creates new prototype from template with proper structure

pnpm create-proto proto-XX-name
# Generates:
# - apps/proto-XX-name/
# - package.json with deps
# - src/ structure
# - AGENTS.md template
# - Basic R3F scene
```

**Build this after proto-01 is complete** - use it as the template.

### 2. Knowledge Base Indexer

```bash
# scripts/index-knowledge.sh  
# Generates summary of all docs for agent context

# Output: docs/INDEX.md with:
# - List of all research docs
# - List of all system docs
# - List of all LEARNINGS.md
# - Quick reference for agents
```

### 3. Prototype Freeze Script

```bash
# scripts/freeze-proto.sh proto-01-movement
# - Validates LEARNINGS.md exists
# - Creates FROZEN.md with timestamp
# - Updates apps/README.md prototype list
# - Optionally tags git commit
```

### 4. AGENTS.md Validator

```bash
# scripts/validate-agents.sh
# Checks all AGENTS.md files for:
# - Required sections present
# - Scope defined
# - Success criteria listed
# - No scope creep vs parent
```

---

## MCP Servers to Consider

### Currently Useful

| MCP | Use Case |
|-----|----------|
| **Context7** | Fetch R3F/Rapier/Three.js docs on demand |
| **GitHub** | Search ecctrl source, find examples |
| **Web Search** | Research game design patterns |

### Worth Adding

| MCP | Would Help With |
|-----|-----------------|
| **Filesystem watcher** | Auto-reload on changes during dev |
| **Performance profiler** | Lighthouse/Web Vitals integration |
| **Asset pipeline** | GLTF optimization, texture compression |

---

## Context Management

### What Goes Where

| Content Type | Location | Loaded By |
|--------------|----------|-----------|
| **Project vision** | `GDD.md` | Read manually at start |
| **Global rules** | `AGENTS.md` | Auto-loaded by Claude Code |
| **Prototype scope** | `apps/*/AGENTS.md` | Load when working on proto |
| **Tech patterns** | `docs/knowledge-base/` | Reference as needed |
| **Research** | `docs/research/` | Reference as needed |
| **Learnings** | `apps/*/LEARNINGS.md` | Reference for next proto |

### Keeping Context Fresh

1. **Start of session**: Read relevant AGENTS.md files
2. **Before implementation**: Check knowledge-base for patterns
3. **When stuck**: Search research docs
4. **After completion**: Update LEARNINGS.md immediately

---

## Delegation Patterns

### Pattern 1: Research → Implement

```typescript
// Step 1: Research (background)
delegate_task(
  subagent_type="librarian",
  run_in_background=true,
  load_skills=[],
  prompt="Research ecctrl character controller. Find how to add custom speed tiers and posture system."
)

// Step 2: Implement (after research completes)
delegate_task(
  category="visual-engineering",
  load_skills=["r3f-fundamentals", "r3f-physics"],
  prompt="Implement posture system based on research. Standing/crouching/prone with collider swap."
)
```

### Pattern 2: Parallel Exploration

```typescript
// Fire multiple explore agents for broad understanding
delegate_task(subagent_type="explore", run_in_background=true, load_skills=[], 
  prompt="Find all useFrame hooks in proto-01")
delegate_task(subagent_type="explore", run_in_background=true, load_skills=[],
  prompt="Find how ecctrl handles collision detection")  
delegate_task(subagent_type="explore", run_in_background=true, load_skills=[],
  prompt="Find camera follow implementation in proto-01")

// Collect results, then make informed changes
```

### Pattern 3: Oracle for Architecture

```typescript
// Before major system design
delegate_task(
  subagent_type="oracle",
  load_skills=["r3f-fundamentals", "r3f-physics"],
  prompt="Review our visibility system design. Should we use raycasting, shader-based sampling, or hybrid? Consider web performance constraints."
)
```

---

## Quality Gates

### Before Marking Prototype Complete

- [ ] All success criteria from AGENTS.md met
- [ ] LEARNINGS.md written with findings
- [ ] No TypeScript errors (`pnpm typecheck`)
- [ ] Runs at 60fps on mid-range hardware
- [ ] Keyboard and gamepad both work (if applicable)
- [ ] Code reviewed by Oracle agent for architecture

### Before Starting Next Prototype

- [ ] Previous prototype frozen
- [ ] LEARNINGS.md reviewed for insights to carry forward
- [ ] New prototype AGENTS.md written
- [ ] Dependencies from previous proto identified
