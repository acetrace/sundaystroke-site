import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://acetrace.github.io',
  base: '/sundaystroke-site',
  build: { format: 'file' },
  integrations: [tailwind({ applyBaseStyles: false })],
});
