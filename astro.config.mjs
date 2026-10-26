import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://sundaystroke.com',
  build: { format: 'file' },
  integrations: [tailwind({ applyBaseStyles: false })],
});
