# plugin-content-claude-plugin-skills

Docusaurus plugin for transforming SKILL.md files from Claude Code plugins into MDX pages. Scans directories for Claude Code skills, extracts metadata, and generates browsable skill documentation.

[![Test](https://github.com/joestump/plugin-content-claude-plugin-skills/actions/workflows/test.yml/badge.svg)](https://github.com/joestump/plugin-content-claude-plugin-skills/actions/workflows/test.yml)

## Installation

```bash
npm install plugin-content-claude-plugin-skills lib-artifact-transforms
```

## Quick Start

In `docusaurus.config.ts`:

```typescript
import type { Config } from '@docusaurus/types';

const config: Config = {
  plugins: [
    [
      'plugin-content-claude-plugin-skills',
      {
        skillsDirs: ['.claude/skills', 'skills'],
      },
    ],
  ],
};

export default config;
```

Then create your first skill in `.claude/skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: A brief description of what this skill does
---

# my-skill

This skill performs a specific task in Claude.

## When to use

Trigger this skill when:
- The user asks to "do something"
- A condition is met

## How it works

1. Step one
2. Step two
3. Step three

## Tips

- Tip one for users
- Tip two for users
```

## Features

- **Multiple directory scanning**: Watches multiple skill directories simultaneously (`.claude/skills`, `skills`, custom paths)
- **Flexible configuration**: Array-based directory configuration — add as many locations as needed
- **Metadata extraction**: Parses YAML frontmatter for skill name, description, and metadata
- **Individual pages**: Creates MDX pages for each skill with formatted content
- **Status tracking**: Visualizes skill maturity and compatibility

## Configuration

### Options

```typescript
interface PluginOptions {
  /**
   * Array of directories to scan for SKILL.md files.
   * Paths are relative to siteDir.
   * @default ['.claude/skills', 'skills']
   */
  skillsDirs?: string[];
}
```

### Example configurations

**Default (two directories):**
```typescript
['plugin-content-claude-plugin-skills', {
  skillsDirs: ['.claude/skills', 'skills']
}]
```

**Multiple directories (monorepo):**
```typescript
['plugin-content-claude-plugin-skills', {
  skillsDirs: [
    '.claude/skills',
    'skills',
    'lib/skills',
    'packages/core/skills'
  ]
}]
```

**Custom location only:**
```typescript
['plugin-content-claude-plugin-skills', {
  skillsDirs: ['architecture/claude-skills']
}]
```

## Skill File Format

Each skill is a directory containing a `SKILL.md` file with YAML frontmatter and markdown documentation.

### Directory structure

```
.claude/skills/
├── my-skill/
│   └── SKILL.md
├── another-skill/
│   └── SKILL.md
skills/
├── special-skill/
│   └── SKILL.md
```

### Frontmatter fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Identifier for the skill (kebab-case) |
| `description` | string | Yes | One-line description used in tiles and listings |
| `argument-hint` | string | No | Hint for command-line usage, e.g. `[search-term]` |
| `category` | string | No | Skill category for organization |
| `tags` | string[] | No | Tags for searching and filtering |
| `status` | string | No | Lifecycle: `stable`, `beta`, `experimental`, `deprecated` |

## Development

```bash
npm test          # run tests
npm run build     # compile TypeScript
npm run watch     # watch mode
```

## Integration with other plugins

- [`plugin-content-claude-plugin-commands`](https://github.com/joestump/plugin-content-claude-plugin-commands) — Command quick-reference page from a skills manifest
- [`plugin-content-adrs`](https://github.com/joestump/plugin-content-adrs) — Architecture Decision Records
- [`plugin-content-openspec`](https://github.com/joestump/plugin-content-openspec) — OpenSpec specifications
- [`lib-artifact-transforms`](https://github.com/joestump/lib-artifact-transforms) — Shared artifact processing utilities

## License

MIT
