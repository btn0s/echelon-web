# Stealth Game Design Psychology: Actionable Principles

## 1. Tension & Release: The Stealth Heartbeat

### Core Principle: Controlled Anxiety
Stealth games are fundamentally **anxiety management simulators**. The player's emotional state should oscillate between:
- **Tension buildup** (planning, infiltration, close calls)
- **Release moments** (safe zones, successful extractions, "phew" moments)

### The 3-Phase Tension Cycle:

1. **Planning Phase** (Low tension, high agency)
   - Safe observation points
   - Time to study patrol patterns
   - No immediate threat
   - *Psychology:* Builds confidence and investment

2. **Execution Phase** (Rising tension)
   - Commitment to plan
   - Proximity to guards increases tension
   - Sound/visual feedback amplifies risk
   - *Psychology:* Flow state + controlled fear

3. **Resolution Phase** (Peak tension → Release)
   - **Success:** Dopamine hit from "close call" survival
   - **Failure:** Clear feedback, quick restart
   - *Psychology:* The "near-miss" is MORE satisfying than easy success

### Design Rules:
- **Never sustain peak tension >90 seconds** without a release valve (safe room, checkpoint, extraction point)
- **Pacing ratio:** 40% planning, 40% execution, 20% recovery
- **Close calls > Perfect safety:** A guard turning away at the last second is more memorable than never being seen
- **Silence is tension:** Ambient sound should drop during high-risk moments (player holds breath = character holds breath)

---

## 2. Player Agency & Mastery: The "Ghost Run" Psychology

### Core Principle: Competence Through Constraint
Players replay stealth games because **self-imposed challenges create meaning**. The game must support escalating mastery.

### Why Players Chase "Ghost" Runs:
1. **Extrinsic motivation** (achievements, stats)
2. **Intrinsic motivation** (personal pride, "I can do better")
3. **Narrative alignment** ("A true professional leaves no trace")
4. **Skill expression** (showing off to self/others)

### The Mastery Ladder:
```
Level 1: Complete the mission (any means)
Level 2: No kills
Level 3: No alerts
Level 4: No detections (ghost)
Level 5: No evidence (zero footprint)
Level 6: Speedrun ghost
```

### Design Rules:
- **Track everything:** Steps taken, bodies moved, doors opened, lights used
- **Post-mission stats screen:** Show mastery metrics WITHOUT judgment
  - "Times detected: 3 | Previous best: 1"
- **Replay value through information:**
  - First playthrough: Learn the space
  - Second playthrough: Optimize the route
  - Third playthrough: Perfect execution
- **Make players feel smart, not lucky:**
  - Predictable AI patterns (not random)
  - Consistent rules (same action = same result)
  - Environmental tells (shadows, sound cues, visual indicators)

### The "Splinter Cell Feeling":
> *"I am a professional. I planned this. I executed flawlessly. I was never here."*

This requires:
- **Pre-mission intel** (maps, guard schedules, objectives)
- **Consistent simulation** (AI doesn't cheat)
- **Visible mastery** (stats, unlocks, reputation)

---

## 3. Information & Uncertainty: The Fog of War

### Core Principle: Partial Information Creates Tension
Too much info = no tension. Too little = frustration. The sweet spot is **informed uncertainty**.

### The Information Hierarchy:

**ALWAYS SHOW (Core Feedback):**
- Player's own noise level (visual indicator)
- Player's visibility (light gem, shadow indicator)
- Guard alert states (idle → suspicious → alert → combat)
- Immediate threats (guard looking at you)

**SOMETIMES SHOW (Skill-Based):**
- Guard vision cones (only when crouched/focused)
- Sound propagation radius (when making noise)
- Patrol routes (learned through observation)

**NEVER SHOW (Preserve Tension):**
- Exact detection thresholds ("You're 73% detected")
- Off-screen guard positions (unless earned via gadget)
- Future patrol paths (only current position)

### Environmental Information Design:
- **Sound design is primary:** Footsteps, radio chatter, door creaks tell you what you can't see
- **Lighting is secondary:** Shadows = safe, light = danger
- **UI is tertiary:** Minimal HUD, diegetic when possible

### The "Readable AI" Contract:
```
Player expectation: "If I do X, guards will respond with Y"
Designer obligation: Make Y predictable and fair
```

### Design Rules:
- **Guard vision cones:** Show them, but make them dynamic (peripheral vision vs focused vision)
- **Sound propagation:** Visualize it ONLY when player makes noise (ripple effect)
- **Suspicion meter:** Gradual, not binary (guard hears something → investigates → returns to patrol)
- **No "psychic" AI:** Guards don't know your position unless they saw/heard you
- **Uncertainty creates tension:** "Did he hear that?" is more engaging than "He definitely heard that"

---

## 4. Failure States: The Restart Problem

### Core Principle: Failure Should Teach, Not Punish

**The Stealth Game Paradox:**
- **Hard restart** (detected = mission over) = High stakes, but kills experimentation
- **Soft failure** (detected = fight your way out) = Low stakes, but dilutes stealth identity

### The Spectrum of Failure:

**Total Failure (Instant Restart):**
- Pros: High tension, pure stealth, clear failure state
- Cons: Frustrating for new players, discourages experimentation
- Best for: "Professional infiltration" games (your design goal)

**Partial Failure (Recovery Mechanics):**
- Pros: Forgiving, allows improvisation, "action stealth" hybrid
- Cons: Reduces tension, encourages "run and gun"
- Best for: Dishonored-style "chaos" systems

**Graduated Failure (Alert Levels):**
- Pros: Teaches players, allows recovery, maintains tension
- Cons: Complex to balance, can feel arbitrary
- Best for: MGS-style "tactical espionage"

### The "Professional's Code" System:
```
Detection Level 0: Undetected (ghost)
Detection Level 1: Suspicious (guard investigates, can be avoided)
Detection Level 2: Spotted (guard sees you, brief window to hide/escape)
Detection Level 3: Compromised (mission failed, restart from checkpoint)
```

### Design Rules:
- **Fast restart:** No more than 5 seconds from failure to retry
- **Checkpoint generosity:** Every 2-3 minutes of progress
- **Failure feedback:** Show EXACTLY what went wrong
  - "Guard heard your footsteps on metal floor"
  - "You were visible in the light for 1.2 seconds"
- **Quicksave/Quickload:** Essential for experimentation (F5/F9 muscle memory)

### Why "Getting Caught = Restart" Can Work:
1. **Clear identity:** This is a STEALTH game, not an action game
2. **High stakes = high reward:** Ghost runs feel earned
3. **Fast iteration:** Players learn through repetition
4. **Narrative alignment:** Professionals don't get caught

### Why It Can Fail:
1. **Unclear failure cause:** "Why did I fail?" = frustration
2. **Slow restart:** Long load times kill momentum
3. **Unfair AI:** Random detection = feels like bad luck, not bad play
4. **No learning:** Same failure loop without new information

---

## 5. AI Perception Design: The Illusion of Intelligence

### Core Principle: AI Should Feel Smart, Not Be Smart

Players don't want realistic AI. They want **predictable, readable, fair** AI that creates the illusion of intelligence.

### The Stealth AI Contract:

**Player's Mental Model:**
```
"Guards have eyes and ears. If I'm quiet and in shadow, I'm safe.
If I make noise or step into light, they'll investigate.
If they see me clearly, I'm caught."
```

**Designer's Obligation:**
Make this mental model 100% accurate.

### Vision System:
- **Cone of vision:** Clear, visible (when appropriate), predictable
- **Peripheral vs focused:** Guards notice movement in periphery, identify in center
- **Distance matters:** Far = silhouette, close = instant recognition
- **Lighting matters:** Shadow = invisible, light = visible
- **Occlusion:** If you can't see them, they can't see you (mostly)

### Hearing System:
- **Sound types:** Footsteps, gunshots, breaking glass, voices
- **Material matters:** Carpet = quiet, metal = loud
- **Distance falloff:** Exponential, not linear
- **Directional:** Guards investigate sound source, not player position
- **Ambient masking:** Loud environments mask player noise

### Investigation Behavior:
- **Curiosity, not omniscience:** Guard investigates last known position, not current position
- **Search patterns:** Predictable (check corners, look behind cover)
- **Return to patrol:** After X seconds, guard resumes normal behavior
- **Memory:** Guards remember disturbances (heightened alert in area)

### Communication:
- **Radio calls:** "I heard something in the warehouse" (gives player info)
- **Visual tells:** Flashlight sweeps, head turns, posture changes
- **Audio tells:** "Huh?", "Must've been the wind", "I'll check it out"

### The "Suspension of Disbelief" Contract:

**Players will accept:**
- Guards with limited vision cones (not 360° awareness)
- Guards who don't notice bodies immediately (if hidden well)
- Guards who return to patrol after investigation (not permanent alert)
- Guards who don't call for backup instantly (gives player time)

**Players will NOT accept:**
- Guards who see through walls
- Guards who know your exact position without seeing you
- Guards who detect you inconsistently (same action, different result)
- Guards who ignore obvious evidence (body in plain sight)

### Making AI Feel Fair:
- **Consistent detection times:** Always 2 seconds in light = detected
- **Predictable patrol routes:** Guards follow schedules, not random paths
- **Visible decision-making:** Guard looks at noise source, then walks toward it
- **No "gotcha" moments:** Player should always understand why they were detected

---

## Synthesis: The "Splinter Cell Feeling" Formula

### Psychological Core:
```
Tension (I might get caught)
+ Agency (I have a plan)
+ Mastery (I'm getting better)
+ Fairness (The rules are consistent)
= Flow State (I am Sam Fisher)
```

### Design Pillars for "Professional Zero-Footprint Infiltration":

1. **PATIENCE IS REWARDED**
   - Observation phase before action
   - Slow, methodical gameplay > twitch reflexes
   - Information gathering is gameplay (binoculars, listening)

2. **PLANNING IS POWER**
   - Pre-mission intel (maps, objectives, guard schedules)
   - Multiple routes (vent, rooftop, front door)
   - Loadout choices matter (silenced pistol vs no weapons)

3. **ENVIRONMENTAL AWARENESS IS SURVIVAL**
   - Light/shadow system (core mechanic)
   - Sound propagation (footsteps, surfaces, ambient noise)
   - Guard patterns (learn, predict, exploit)

4. **PERFECTION IS POSSIBLE**
   - Consistent AI (same input = same output)
   - Clear feedback (why did I fail?)
   - Mastery metrics (ghost run stats)

5. **FAILURE IS LEARNING**
   - Fast restart (no punishment for experimentation)
   - Clear failure cause (guard heard X, saw Y)
   - Graduated difficulty (easy to learn, hard to master)

### The Emotional Journey:

```
Mission Start
    ↓
[PLANNING] "I've got this" (confidence)
    ↓
[INFILTRATION] "Okay, here we go" (focus)
    ↓
[CLOSE CALL] "Oh shit oh shit" (panic)
    ↓
[NARROW ESCAPE] "HOLY SHIT YES" (euphoria)
    ↓
[EXTRACTION] "I'm a goddamn professional" (pride)
    ↓
[STATS SCREEN] "I can do better" (motivation to replay)
```

---

## Actionable Checklist for Echelon

### Tension & Release:
- [ ] Safe observation points before each area
- [ ] Tension peaks every 60-90 seconds
- [ ] Recovery moments (safe rooms, extraction points)
- [ ] Close calls are more satisfying than perfect safety

### Player Agency:
- [ ] Multiple routes per objective
- [ ] Pre-mission planning phase
- [ ] Post-mission stats (detections, alerts, time, evidence)
- [ ] Mastery ladder (complete → ghost → zero-footprint → speedrun)

### Information Design:
- [ ] Visibility indicator (light gem / shadow meter)
- [ ] Noise indicator (footstep volume)
- [ ] Guard alert states (idle → suspicious → alert)
- [ ] Sound-based information (footsteps, radio chatter)
- [ ] Minimal UI, diegetic when possible

### Failure States:
- [ ] Clear failure feedback ("Guard heard your footsteps on metal")
- [ ] Fast restart (<5 seconds)
- [ ] Generous checkpoints (every 2-3 minutes)
- [ ] Quicksave/Quickload support

### AI Perception:
- [ ] Visible vision cones (when appropriate)
- [ ] Predictable patrol routes
- [ ] Consistent detection rules
- [ ] Investigation behavior (not omniscience)
- [ ] Audio/visual tells for AI state
- [ ] No "psychic" AI (must see/hear to detect)

---

## Recommended Deep Dives

**GDC Talks:**
- "Hitman: Designing for Player Expression" (IO Interactive)
- "Dishonored: Designing for Player Choice" (Arkane Studios)
- "Metal Gear Solid: AI and Stealth" (Kojima Productions)

**Game Maker's Toolkit (Mark Brown):**
- "What Makes a Good Stealth Game?"
- "The Invisible Tutorial"
- "Hitman's Genius Design"

**Books:**
- *The Art of Game Design* by Jesse Schell (Lens #44: Skill, Lens #45: Expected Value)
- *Rules of Play* by Salen & Zimmerman (Chapter on Uncertainty)
- *A Theory of Fun* by Raph Koster (Pattern recognition and mastery)

**Postmortems:**
- Thief: The Dark Project (Looking Glass Studios)
- Splinter Cell: Chaos Theory (Ubisoft Montreal)
- Mark of the Ninja (Klei Entertainment)

---

**The essence of great stealth design:** Make players feel like **competent professionals executing a perfect plan**, not lucky amateurs stumbling through chaos. Every system should reinforce this fantasy.
