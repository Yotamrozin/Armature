import { defineType, defineField, ALL_FIELDS_GROUP } from 'sanity';

// Page singleton for the homepage. Fixed shape (named hero fields) with the door
// left open for blocks via the `sections` array. There is exactly one of these.
// Follows the worked example in SCHEMA-CONVENTIONS.md.
export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    // Opens to the full document rather than the first tab — see
    // SCHEMA-CONVENTIONS.md. Named tabs stay available for narrowing the view.
    { ...ALL_FIELDS_GROUP, default: true },
    { name: 'hero', title: 'Hero' },
    { name: 'sections', title: 'Sections' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero heading',
      type: 'string',
      group: 'hero',
      description: 'The large heading at the top. Keep it short.',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'imageWithAlt', // alt-required wrapper
      group: 'hero',
      description: 'The main image at the top of the homepage.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'sections',
      of: [{ type: 'hero' }, { type: 'postFeatured' }, { type: 'postList' }],
      description: 'Optional stackable sections below the hero.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
});
