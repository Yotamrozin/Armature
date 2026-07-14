import type { ComponentProps } from 'react';
import { FormField, type FieldProps } from 'sanity';
import { Box, Flex, Text, Tooltip } from '@sanity/ui';
import { Icon } from '@sanity/icons';

// Using the generic Icon+symbol form, not a named icon import like
// `HelpCircleIcon` — this installed @sanity/icons version's type file
// declares named exports its actual built JS doesn't ship (confirmed via
// build failure: MISSING_EXPORT), so named imports resolve at the type
// level but fail at build time. Icon+symbol reads from the same runtime
// registry the rest of the icon set is built on, so it actually works.

// For compact leaf fields (string/number) with a `description`, show that
// description as a hover tooltip next to the label instead of a permanent
// paragraph underneath it — a form with many small guardrail fields (see
// SCHEMA-CONVENTIONS.md's "describe every field") stays scannable rather
// than every field growing a few lines of grey help text. Wired globally in
// sanity.config.ts (form.components.field), not per field, so any field
// matching this shape gets it automatically.
//
// Sanity's `FormField` is exported but marked @internal — it's still a real
// React component (not a DOM/CSS hack), and it's how Sanity's own default
// field wrapper is built, so this stays within "standard customization APIs"
// even though the type isn't part of the fully-stable public contract.
function TooltipDescriptionField(props: FieldProps) {
  const { title, description, children, validation, level, inputId, path } = props;

  const titleWithHint = (
    <Flex align="center" gap={2}>
      <Text size={1} weight="semibold">
        {title}
      </Text>
      {description && (
        <Tooltip
          content={
            <Box padding={2} style={{ maxWidth: 260 }}>
              <Text size={1}>{description}</Text>
            </Box>
          }
          placement="top"
        >
          <span style={{ display: 'inline-flex', cursor: 'help', color: 'var(--card-muted-fg-color)' }}>
            <Icon symbol="help-circle" />
          </span>
        </Tooltip>
      )}
    </Flex>
  );

  // FormField's `title` is declared as `ReactNode` in its own props, but the
  // component's full type also intersects with native HTMLProps (which has
  // its own string-only `title` attribute), so TypeScript merges them into a
  // type a real element can't satisfy — a declaration-file quirk, not a
  // runtime one; Sanity's own default field wrapper renders ReactNode titles
  // just fine. Cast at the call site rather than fight the merged type.
  const formFieldProps = {
    title: titleWithHint,
    validation,
    level,
    inputId,
    path,
  } as unknown as ComponentProps<typeof FormField>;

  return <FormField {...formFieldProps}>{children}</FormField>;
}

const COMPACT_JSON_TYPES = new Set(['string', 'number']);

export function withTooltipDescriptions(props: FieldProps) {
  const jsonType = (props.schemaType as { jsonType?: string } | undefined)?.jsonType;
  const isCompact = jsonType ? COMPACT_JSON_TYPES.has(jsonType) : false;

  if (isCompact && props.description) {
    return <TooltipDescriptionField {...props} />;
  }

  return props.renderDefault(props);
}
