import { Button, Flex } from '@sanity/ui';
import { usePresentationNavigate, type PreviewHeaderProps } from 'sanity/presentation';

// Site Settings is the one document type deliberately excluded from
// click-to-edit in Presentation (see loadQuery.ts's stega filter — it's a
// global singleton whose content, like the navbar, would otherwise clutter
// "Documents on this page" on every single page). That means its content
// (nav links, footer links, social links, logo, contact info) has no
// in-canvas path to editing at all — this button is the replacement: one
// click from Presentation straight to the document. It lands on "All
// fields" (see the ALL_FIELDS_GROUP default on siteSettings) rather than
// deep-linking to a specific group/field, since Sanity has no confirmed,
// reliable URL param for that — showing everything at once is simple and
// avoids depending on unconfirmed internals.
//
// Wired via presentationTool's `components.unstable_header` (sanity.config.ts)
// — a real extension point, but Sanity marks it unstable/not a guaranteed
// API shape across versions.
function SiteSettingsButton() {
  const navigate = usePresentationNavigate();
  return (
    <Button
      mode="bleed"
      text="Site Settings"
      onClick={() => navigate(undefined, { type: 'siteSettings', id: 'siteSettings' })}
    />
  );
}

export function PresentationHeader(props: PreviewHeaderProps) {
  return (
    <Flex align="center" style={{ width: '100%' }}>
      <div style={{ flex: 1, minWidth: 0 }}>{props.renderDefault(props)}</div>
      <SiteSettingsButton />
    </Flex>
  );
}
