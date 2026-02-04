Below is a **clean, non-technical Game Design Document** for **Echelon**.
No implementation details. No engine references. No design rationale. Just *what the game is*.

---

# **Echelon – Game Design Document**

## High Concept

**Echelon** is a tactical stealth game focused on professional, zero-footprint infiltration.
Players operate as a highly trained covert operative completing tightly scoped missions where success is defined not just by completion, but by how cleanly the mission is executed.

The game emphasizes patience, planning, environmental awareness, and restraint over speed or firepower.

---

## Core Fantasy

You are a top-tier operator working for a covert organization whose credibility depends on leaving no trace.

You are not a hero, a soldier, or a chaos agent.
You are a professional.

Mistakes are costly—not because they end the mission immediately, but because they compromise the operation and reflect poorly on Echelon as an organization.

---

## Player Experience Goals

* Feel constantly **tense but in control**
* Make deliberate, informed choices
* Read environments clearly
* Recover from small mistakes, but not large ones
* Replay missions to improve execution quality, not just outcomes

---

## Game Structure

### Modes

* **Story Mode**

  * Hand-authored missions
  * Single primary objective per mission
  * Mandatory exfiltration
* **Optional Future Mode**

  * Roguelike-style mission remixing using existing locations and systems

---

## Level Design

### Map Scale

* Medium-sized, dense environments
* Comparable to compact compounds or facilities rather than open worlds
* Multiple routes, verticality, and layered spaces

### Level Philosophy

* One primary objective
* Many possible approaches
* No prescribed “correct” path
* The environment supports player creativity without encouraging chaos

---

## Core Stealth Systems

### Visibility

* Player visibility is influenced by light and shadow
* Bright areas increase risk
* Dark areas provide concealment

### Sound

* Player actions generate varying levels of noise
* Movement speed, posture, and surface type affect sound output
* Noise attracts attention rather than triggering instant failure

### Readability

* Stealth information is presented clearly to the player
* UI communicates exposure and risk in real time
* Optional reduced-UI modes may be available for advanced players

---

## Enemy Behavior

### Awareness States

Enemies respond to the world logically and locally.

* **Unaware** – normal patrol behavior
* **Suspicious** – investigating anomalies
* **Alerted** – actively responding to a threat
* **Escalated** – increased presence and coordination

### Detection Types

* **Indirect Detection**

  * Sounds, environmental disturbances, missing elements
  * Triggers investigation and potential escalation
* **Direct Detection**

  * Visual confirmation or body discovery
  * Initiates immediate response with limited reaction windows

Enemies do not share perfect global knowledge.
Information spreads based on proximity and communication, not magically.

---

## Escalation System

* Missions have escalating alert levels
* Each escalation increases difficulty through:

  * More guards
  * Tighter patrols
  * Faster response times
* Escalation is reversible only through careful mitigation, not brute force
* Enemies arrive logically and visibly when possible

---

## Combat & Damage

* Combat is lethal and unforgiving
* Player and enemies follow the same damage rules
* Firefights are risky and discouraged, but possible
* Survival depends on positioning and preparation, not durability

---

## Player Actions

### Approach Styles

* Pure stealth
* Tactical takedowns
* Environmental manipulation
* Limited lethal force

All approaches are allowed.
Only some are rewarded.

---

## Failure & Retry

* Missions are fully restartable
* No mid-mission checkpointing (for the demo slice)
* Failure does not always mean death—sometimes it means a compromised mission

---

## Scoring & Evaluation

### Mission Scoring

Each mission is evaluated based on:

* Alerts triggered
* Evidence left behind
**  Bodies discovered

### Ranking

* Missions receive an overall rank
* Ranks reflect professionalism and operational integrity
* High ranks require restraint, planning, and precision

A mission can be completed and still considered a failure in spirit.

---

## Tone & Presentation

* Serious, restrained, grounded
* Minimal spectacle
* No power fantasy exaggeration
* Professional language, subdued visuals, clear audio cues

---

## What Echelon Is Not

* Not a run-and-gun shooter
* Not an open-world sandbox
* Not a puzzle game with fixed solutions
* Not a cinematic power fantasy

---

## Design Promise

**Echelon rewards mastery, not momentum.**
The game respects the player’s intelligence and expects discipline in return.
