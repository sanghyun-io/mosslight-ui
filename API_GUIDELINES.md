# API Guidelines

Mosslight UI components should stay predictable for external consumers.

## Controlled and Uncontrolled State

- Components with meaningful state should support uncontrolled usage through `defaultValue` when practical.
- Components with externally managed state should use `value` plus `onValueChange`.
- Existing examples: `Accordion`, `Tabs`, `Pagination`, and `Dialog`.

## Naming

- Use `tone` for visual intent such as `moss`, `sky`, `amber`, `plum`, or `danger`.
- Use `variant` for structural button-like alternatives such as `primary`, `secondary`, and `ghost`.
- Use `size` only for physical size changes.
- Use `hint` and `error` for form descriptions.

## Accessibility

- Interactive components must expose a useful accessible name.
- Form controls must connect labels with controls and connect hint/error text through `aria-describedby`.
- Keyboard interactions should follow the WAI-ARIA Authoring Practices where a pattern exists.

## Styling

- Prefer semantic tokens from `THEMING.md` in new components.
- Keep component classes prefixed with `ms-`.
- Do not add component-specific global element styles outside the design-system reset.
