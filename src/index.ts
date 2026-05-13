import type { LoadContext, Plugin } from '@docusaurus/types';
import glob from 'fast-glob';
import { readFileSync } from 'fs';
import { join, basename, dirname } from 'path';
import { parseFrontmatter, extractField } from 'lib-artifact-transforms';

export interface PluginOptions {
  skillsDirs?: string[];
}

export interface PluginConfig extends PluginOptions {}

const defaultConfig: PluginConfig = {
  skillsDirs: ['.claude/skills', 'skills'],
};

export interface SkillArtifact {
  name: string;
  description: string;
  argumentHint?: string;
  category?: string;
  tags?: string[];
  status?: string;
  sourceDir: string;
  whenToUse?: string;
  howItWorks?: string;
  tips?: string;
}

export default function pluginContentSkills(
  context: LoadContext,
  options: PluginConfig,
): Plugin<{ skills: SkillArtifact[] }> {
  const config: PluginConfig = {
    skillsDirs: options?.skillsDirs ?? defaultConfig.skillsDirs,
  };

  return {
    name: 'docusaurus-plugin-content-skills',
    async loadContent() {
      try {
        const skills: SkillArtifact[] = [];

        // Scan all configured directories
        for (const dir of config.skillsDirs!) {
          const skillsDir = join(context.siteDir, dir);
          const pattern = join(skillsDir, '*/SKILL.md');

          try {
            const files = await glob(pattern);

            for (const file of files.sort()) {
              const content = readFileSync(file, 'utf-8');
              const { metadata, content: body } = parseFrontmatter(content);

              const skillDir = dirname(file);
              const skillName = basename(skillDir);

              const name = extractField<string>(
                metadata,
                'name',
                skillName,
              );
              const description = extractField<string>(
                metadata,
                'description',
                '',
              );

              if (!name || !description) {
                console.warn(
                  `Skipping skill at ${file}: missing name or description`,
                );
                continue;
              }

              // Extract sections from body
              const whenMatch = body.match(
                /##\s+When\s+to\s+use[\s\S]*?(?=##|$)/i,
              );
              const howMatch = body.match(
                /##\s+How\s+it\s+works[\s\S]*?(?=##|$)/i,
              );
              const tipsMatch = body.match(/##\s+Tips[\s\S]*?(?=##|$)/i);

              skills.push({
                name,
                description,
                argumentHint: extractField<string>(
                  metadata,
                  'argument-hint',
                ),
                category: extractField<string>(metadata, 'category'),
                tags: extractField<string[]>(metadata, 'tags'),
                status: extractField<string>(metadata, 'status'),
                sourceDir: dir,
                whenToUse: whenMatch ? whenMatch[0].substring(0, 200) : '',
                howItWorks: howMatch ? howMatch[0].substring(0, 200) : '',
                tips: tipsMatch ? tipsMatch[0].substring(0, 200) : '',
              });
            }
          } catch (error) {
            // Gracefully skip directories that don't exist
            console.debug(`Skipping directory ${skillsDir}:`, error);
          }
        }

        return { skills };
      } catch (error) {
        console.warn(`Error loading skills:`, error);
        return { skills: [] };
      }
    },
    async contentLoaded({ content, actions }) {
      // Create routes for each skill
      if (content.skills.length === 0) {
        return;
      }

      for (const skill of content.skills) {
        // This would be expanded to actually create MDX pages
        // For now, the plugin loads and parses the content
      }
    },
  };
}
