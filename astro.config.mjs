import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';
import { siSimpleicons } from 'simple-icons';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react({      experimentalReactChildren: true}), siSimpleicons()],
});
