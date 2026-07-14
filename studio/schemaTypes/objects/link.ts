import { defineType, defineField } from 'sanity';

// One link model for the whole site. A link is either internal (a reference to
// another document) or external (a URL), chosen via `linkType`. The irrelevant
// field is hidden and the relevant one is required, so links behave the same
// everywhere.
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The text shown for this link.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link type',
      type: 'string',
      description: 'Choose whether this points to a page on this site or an external URL.',
      options: {
        list: [
          { title: 'Internal page', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internal',
      title: 'Internal page',
      type: 'reference',
      description: 'The page on this site to link to. Only shown when Link type above is set to "Internal page".',
      // Extend this list as more page singletons and collections are added.
      to: [
        { type: 'homepage' },
        { type: 'blogIndex' },
        { type: 'about' },
        { type: 'contact' },
        { type: 'post' },
      ],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === 'internal' && !value) return 'Select a page to link to.';
          return true;
        }),
    }),
    defineField({
      name: 'external',
      title: 'External URL',
      type: 'url',
      description:
        'The full URL to link to, including https://. Only shown when Link type above is set to "External URL".',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string };
          if (parent?.linkType === 'external' && !value) return 'Enter a URL to link to.';
          return true;
        }),
    }),
  ],
  preview: {
    // Without this, collapsed link items in an array (primaryNav, footerLinks,
    // socialLinks) fall back to Sanity's generic "Untitled" — label isn't one
    // of the field names Sanity guesses at automatically. Not showing the
    // referenced page's own title here — page singletons don't share a common
    // title-like field name (heroHeading vs heading vs ...), so that lookup
    // would be fragile; linkType + the raw URL is enough to tell items apart.
    select: { title: 'label', linkType: 'linkType', external: 'external' },
    prepare: ({ title, linkType, external }) => ({
      title: title || 'Untitled link',
      subtitle: linkType === 'internal' ? 'Internal page' : external || 'External URL',
    }),
  },
});
