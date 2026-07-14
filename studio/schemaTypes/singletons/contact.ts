import { defineType, defineField, ALL_FIELDS_GROUP } from 'sanity';

// Page singleton for /contact. Just a heading and intro — the actual contact
// details (email, phone, address) live on siteSettings, since they're
// site-wide facts, not page copy, and this page reads them from there.
export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  groups: [
    { ...ALL_FIELDS_GROUP, default: true },
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      description: 'The main heading at the top of the Contact page.',
      initialValue: 'Contact',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 4,
      group: 'content',
      description:
        'A short paragraph inviting visitors to get in touch. Contact details (email, phone, address) come from Site Settings.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact' }),
  },
});
