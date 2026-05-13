# plugin-content-skills

Docusaurus plugin for transforming SKILL.md files from multiple configurable directories into MDX pages. Scans directories for Claude skills, extracts metadata, and generates browsable skill documentation with auto-generated landing pages, command tiles, and usage guides.

[![Test](https://github.com/joestump/plugin-content-skills/actions/workflows/test.yml/badge.svg)](https://github.com/joestump/plugin-content-skills/actions/workflows/test.yml)

## Installation

```bash
npm install plugin-content-skills lib-artifact-transforms
```

## Quick Start

In `docusaurus.config.ts`:

```typescript
import type { Config } from '@docusaurus/types';

const config: Config = {
  plugins: [
    [
      'plugin-content-skills',
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
- **Landing page**: Auto-generates a skills index with quick reference
- **Individual pages**: Creates MDX pages for each skill with formatted content
- **Command tiles**: Auto-generates command/usage tile data for CLI skill discovery
- **Cross-references**: Links related skills and integrations
- **Status tracking**: Visualizes skill maturity and compatibility

## Configuration

### Options

```typescript
interface PluginOptions {
  /**
   * Array of directories to scan for SKILL.md files
   * Directories are scanned recursively
   * Relative to project root
   * @default ['.claude/skills', 'skills']
   */
  skillsDirs?: string[];
}
```

### Example configurations

**Default (two directories):**
```typescript
['plugin-content-skills', {
  skillsDirs: ['.claude/skills', 'skills']
}]
```

**Multiple directories (monorepo):**
```typescript
['plugin-content-skills', {
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
['plugin-content-skills', {
  skillsDirs: ['architecture/claude-skills']
}]
```

## Skill File Format

Each skill is a directory containing a `SKILL.md` file with metadata and documentation.

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

### SKILL.md format

```markdown
---
name: skill-name
description: One-line description of what this skill does
---

# skill-name

Brief introduction to the skill.

## When to use

Describe the situations or triggers for this skill.

## How it works

Explain the workflow and steps involved.

## Tips

Provide helpful hints for using the skill.

## See also

Related skills or integrations.
```

### Frontmatter fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Identifier for the skill (kebab-case, no spaces) |
| `description` | string | Yes | One-line description (used in tiles and listings) |
| `argument-hint` | string | No | Optional hint text for command-line usage (e.g., `[search-term]`) |
| `category` | string | No | Skill category for organization (e.g., `AI`, `Automation`, `Documentation`) |
| `tags` | string[] | No | Array of tags for searching and filtering |
| `status` | string | No | Lifecycle: `stable`, `beta`, `experimental`, `deprecated` |

### Full example with all fields

```markdown
---
name: document-generator
description: Auto-generates documentation from source code and comments
argument-hint: [--format markdown|html] [path]
category: Documentation
tags: [docs, automation, generation]
status: stable
---

# document-generator

Automatically generates API documentation from source code annotations.

## When to use

Trigger this skill when:
- You need to generate fresh API docs
- Documentation is out of sync with code
- Building a new public-facing feature

## How it works

1. Scans source files for JSDoc or similar annotations
2. Extracts function signatures, types, and descriptions
3. Generates formatted markdown or HTML output
4. Creates table of contents automatically

## Tips

- Always run before releasing a new version
- Docs are cached; force refresh with `--no-cache`
- Customize output format with `--format` flag

## See also

- `/documentation` — Manual documentation editing
- `/api-spec` — OpenAPI specification generation
```

## Generated Output

This plugin generates:

1. **Skills landing page** at `/docs/skills/` — Index of all available skills
2. **Individual skill pages** at `/docs/skills/my-skill/`, etc.
3. **Command tile data** — Auto-generated usage hints and categories
4. **Quick reference** — Searchable skill directory
5. **Sidebar entries** — Skills integrated into documentation sidebar
6. **Status badges** — Maturity indicators for each skill

## Development

### Running tests

```bash
npm test
```

### Building

```bash
npm run build
```

### Watch mode (during development)

```bash
npm run watch
```

## Testing

This plugin includes comprehensive test coverage:

```bash
npm test -- --coverage
```

Coverage thresholds:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Integration with other plugins

This plugin works best alongside:

- [`plugin-content-adrs`](https://github.com/joestump/plugin-content-adrs) — Architecture Decision Records
- [`plugin-content-openspec`](https://github.com/joestump/plugin-content-openspec) — OpenSpec specifications
- [`lib-artifact-transforms`](https://github.com/joestump/lib-artifact-transforms) — Shared artifact processing utilities

## Troubleshooting

**Q: Skills not appearing in the sidebar**  
A: Ensure `skillsDirs` includes the directories where your SKILL.md files live. Check that each file is in a subdirectory: `.claude/skills/my-skill/SKILL.md` (not `.claude/skills/SKILL.md`).

**Q: Metadata not being extracted**  
A: Verify your frontmatter is valid YAML between `---` delimiters. Check that `name` and `description` fields are present.

**Q: Multiple directories not scanning**  
A: Verify all `skillsDirs` paths exist relative to your project root. Use absolute paths or paths relative to `docusaurus.config.ts`.

**Q: Command tiles not generating**  
A: Ensure your `SKILL.md` has a frontmatter `name` field. Tiles are auto-generated from metadata.

## License

MIT
