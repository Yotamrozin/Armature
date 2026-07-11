import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from 'sanity:client';

// Build URLs for Sanity image assets. Wraps the shared client so projectId and
// dataset come from one place (the @sanity/astro integration config).
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
