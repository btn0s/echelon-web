# proto-02-light-shadow

## Purpose

Validate player visibility feedback driven by light and shadow.

## Success Criteria

- [ ] Visibility meter updates in real time based on scene lighting
- [ ] Dark areas provide reliable concealment
- [ ] Bright areas produce predictable exposure increase
- [ ] Light interactions (on/off) immediately affect visibility state
- [ ] Prototype runs at 60fps on mid-range hardware

## Scope

### In Scope

- Light sampling around player silhouette
- Binary hidden/exposed state first, then normalized meter
- Debug overlays for sampled points and aggregate visibility
- Minimal test scene with lit and shadowed zones
- Basic light interaction toggles for validation

### Out of Scope

- Enemy AI or full perception logic
- Noise/sound systems
- Combat and gadgets
- Objective flow
