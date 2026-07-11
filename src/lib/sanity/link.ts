// Resolve a `link` object (see studio/schemaTypes/objects/link.ts) to an href.
// Internal links currently only target the homepage singleton (the schema's
// `to` list), which is routed at `/`. Extend the internal branch as more routed
// page/collection types are added.
export interface SanityLink {
  linkType?: 'internal' | 'external';
  external?: string;
  internal?: { _ref?: string; _type?: string };
}

export function resolveHref(link?: SanityLink): string | undefined {
  if (!link) return undefined;
  if (link.linkType === 'external') return link.external;
  if (link.linkType === 'internal') return '/';
  return undefined;
}
