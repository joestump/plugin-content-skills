import pluginContentSkills from '../index';

describe('plugin-content-skills', () => {
  describe('module export', () => {
    it('should export a default function', () => {
      expect(typeof pluginContentSkills).toBe('function');
    });

    it('should return a plugin object with required methods', () => {
      const mockContext = {
        siteDir: '/tmp/site',
        generatedFilesDir: '/tmp/generated',
        outDir: '/tmp/out',
        baseUrl: '/',
        i18n: { currentLocale: 'en' },
      } as any;

      const plugin = pluginContentSkills(mockContext, {
        skillsDirs: ['.claude/skills', 'skills']
      });

      expect(plugin.name).toBe('docusaurus-plugin-content-skills');
      expect(typeof plugin.loadContent).toBe('function');
      expect(typeof plugin.contentLoaded).toBe('function');
    });
  });

  describe('options merging', () => {
    it('should use default skillsDirs when not provided', () => {
      const mockContext = {
        siteDir: '/tmp/site',
        generatedFilesDir: '/tmp/generated',
        outDir: '/tmp/out',
        baseUrl: '/',
        i18n: { currentLocale: 'en' },
      } as any;

      const plugin = pluginContentSkills(mockContext, {});

      expect(plugin.name).toBe('docusaurus-plugin-content-skills');
    });

    it('should use custom skillsDirs when provided', () => {
      const mockContext = {
        siteDir: '/tmp/site',
        generatedFilesDir: '/tmp/generated',
        outDir: '/tmp/out',
        baseUrl: '/',
        i18n: { currentLocale: 'en' },
      } as any;

      const plugin = pluginContentSkills(mockContext, {
        skillsDirs: ['.claude/skills', 'lib/skills', 'custom']
      });

      expect(plugin.name).toBe('docusaurus-plugin-content-skills');
    });
  });

  describe('loadContent', () => {
    it('should return empty skills array on init', async () => {
      const mockContext = {
        siteDir: '/tmp/site',
        generatedFilesDir: '/tmp/generated',
        outDir: '/tmp/out',
        baseUrl: '/',
        i18n: { currentLocale: 'en' },
      } as any;

      const plugin = pluginContentSkills(mockContext, {});
      const content = await plugin.loadContent!();

      expect(content).toEqual({ skills: [] });
    });

    it('should support multiple skill directories', async () => {
      const mockContext = {
        siteDir: '/tmp/site',
        generatedFilesDir: '/tmp/generated',
        outDir: '/tmp/out',
        baseUrl: '/',
        i18n: { currentLocale: 'en' },
      } as any;

      const plugin = pluginContentSkills(mockContext, {
        skillsDirs: ['.claude/skills', 'skills', 'lib/skills']
      });
      const content = await plugin.loadContent!();

      expect(content).toEqual({ skills: [] });
    });
  });
});
