// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

// astro.config runs in Node, where `.env` is NOT auto-loaded into process.env.
// Load it explicitly so the Sanity integration gets projectId/dataset.
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
);

// Workaround for @sanity/astro on Astro 7 / Vite 8 (rolldown): the integration's
// module-dedupe plugin aliases `sanity` to its package directory, and rolldown's
// dependency optimizer then fails to resolve the named exports that
// `sanity/structure` re-imports (useClient, useSchema, …), crashing pre-bundling
// and leaving the embedded Studio a blank screen in dev. This env var is the
// integration's built-in switch to disable that dedupe/alias plugin. Safe here
// because node_modules has a single copy of react/sanity/styled-components.
// Set before defineConfig so it's in effect when the integration initialises.
process.env.SANITY_ASTRO_DISABLE_MODULE_DEDUPE ??= '1';

// https://astro.build/config
export default defineConfig({
  // Hybrid rendering: pages are static by default and opt into
  // on-demand server rendering with `export const prerender = false`.
  output: 'static',
  adapter: vercel(),
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      // Embed Sanity Studio at /admin.
      studioBasePath: '/admin',
      useCdn: false,
    }),
    react(),
  ],
});
