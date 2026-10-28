import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://sundaystroke.com',
  build: { format: 'preserve' },
  integrations: [tailwind({ applyBaseStyles: false })],
});
