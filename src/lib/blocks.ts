import Hero from '../components/blocks/Hero.astro';

// Block dispatcher: maps a Sanity block `_type` to the Astro component that
// renders it (see SCHEMA-CONVENTIONS.md). Wired from day one even though only
// one block exists. Adding a block later is additive: define the schema in
// studio/schemaTypes/blocks/, build the component in src/components/blocks/,
// and register it here.
export const blockComponents = {
  hero: Hero,
};

export type BlockType = keyof typeof blockComponents;
