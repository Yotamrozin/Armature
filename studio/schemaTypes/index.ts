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
import { blogIndex } from './singletons/blogIndex';
import { about } from './singletons/about';
import { contact } from './singletons/contact';

// Collections
import { post } from './collections/post';

// Blocks
import { hero } from './blocks/hero';
import { postFeatured } from './blocks/postFeatured';
import { postList } from './blocks/postList';

export const schemaTypes = [
  // Objects (reusable)
  seo,
  link,
  imageWithAlt,
  // Singletons
  siteSettings,
  homepage,
  blogIndex,
  about,
  contact,
  // Collections
  post,
  // Blocks
  hero,
  postFeatured,
  postList,
];
