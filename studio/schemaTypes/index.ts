// Central schema registry for the Sanity Studio.
// Everything the Studio knows about is registered here, grouped by shape:
// objects (reusable), singletons, collections, and blocks.

// Objects (reusable)
import { seo } from './objects/seo';
import { link } from './objects/link';
import { imageWithAlt } from './objects/image';

// Singletons
import { siteSettings } from './singletons/siteSettings';
import { homepage } from './singletons/homepage';

// Blocks
import { hero } from './blocks/hero';

export const schemaTypes = [
  // Objects (reusable)
  seo,
  link,
  imageWithAlt,
  // Singletons
  siteSettings,
  homepage,
  // Blocks
  hero,
];
