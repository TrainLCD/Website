import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  srcDir: './src',
  integrations: [
    preact({
      compat: true,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
