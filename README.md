# plugin-content-skills

Docusaurus plugin for transforming SKILL.md files from multiple directories into MDX pages.

## Installation

```bash
npm install plugin-content-skills lib-artifact-transforms
```

## Usage

In `docusaurus.config.ts`:

```typescript
export default {
  plugins: [
    [
      'plugin-content-skills',
      {
        skillsDirs: ['.claude/skills', 'skills', 'lib/skills'],
      },
    ],
  ],
};
```

## Features

- Scans multiple configurable directories for SKILL.md files
- Extracts frontmatter: name, description, when-to-use, how-it-works, tips
- Generates a skills landing page
- Generates individual skill pages
- Auto-generates command/usage tile data
- Integrates with `lib-artifact-transforms` for relationship visualization

## Options

- `skillsDirs` (string[], default: `['.claude/skills', 'skills']`) — Array of directories to scan for SKILL.md files

## License

MIT
