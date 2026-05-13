import type { LoadContext, Plugin } from '@docusaurus/types';

export interface PluginOptions {
  skillsDirs?: string[];
}

export interface PluginConfig extends PluginOptions {}

const defaultConfig: PluginConfig = {
  skillsDirs: ['.claude/skills', 'skills'],
};

export default function pluginContentSkills(
  context: LoadContext,
  options: PluginConfig,
): Plugin<void> {
  const config: PluginConfig = {
    skillsDirs: options?.skillsDirs ?? defaultConfig.skillsDirs,
  };

  return {
    name: 'docusaurus-plugin-content-skills',
    async loadContent() {
      // TODO: Scan all skillsDirs for SKILL.md files
      // Extract frontmatter: name, description, when-to-use, how-it-works, tips, see-also
      return { skills: [] };
    },
    async contentLoaded({ content, actions }) {
      // TODO: Generate MDX pages for each skill
      // Create skills landing page
      // Create individual skill pages
      // Auto-generate command/usage tile data
    },
  };
}
