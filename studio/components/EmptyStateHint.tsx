import type {
  ArrayOfObjectsInputProps,
  ArrayOfPrimitivesInputProps,
  PortableTextInputProps,
} from 'sanity';
import { Box, Text } from '@sanity/ui';

type HintableInputProps = ArrayOfObjectsInputProps | ArrayOfPrimitivesInputProps | PortableTextInputProps;

// Sanity's array and portable-text inputs don't have a schema-level
// `placeholder` prop (unlike plain string/text fields) — this wraps the
// default input via `components.input` (a standard, documented extension
// point) to show custom copy only while the field is genuinely empty, so a
// blank field reads as "nothing here yet" rather than "is this broken?".
export function withEmptyHint(hint: string) {
  return function EmptyHintInput(props: HintableInputProps) {
    const isEmpty = !props.value || (Array.isArray(props.value) && props.value.length === 0);
    return (
      <>
        {isEmpty && (
          <Box paddingBottom={2}>
            <Text size={1} muted style={{ fontStyle: 'italic' }}>
              {hint}
            </Text>
          </Box>
        )}
        {props.renderDefault(props)}
      </>
    );
  };
}
