# Documentation

## Directory Structure

```
docs/
├── research/          # External research and analysis
│   ├── splinter-cell/ # SC mechanics deep-dive
│   ├── stealth-design/# Stealth game design theory
│   └── web-tech/      # Web game tech research
├── design/            # Our design decisions
│   ├── GDD.md         # Game Design Document (root)
│   └── systems/       # Individual system designs
└── systems/           # Technical system documentation
    ├── architecture.md
    └── {system}.md
```

## Research vs Design

**Research** (`research/`) - External knowledge gathering:
- How other games solved problems
- Academic/theoretical foundations
- Technology options and tradeoffs

**Design** (`design/`) - Our decisions:
- What we're building and why
- Specific mechanic parameters
- Scope and constraints

**Systems** (`systems/`) - Technical documentation:
- How systems are implemented
- API documentation
- Integration points

## Writing Guidelines

- Be specific, not vague
- Include numbers/parameters when known
- Link to source material
- Update when decisions change
- Mark speculation clearly
