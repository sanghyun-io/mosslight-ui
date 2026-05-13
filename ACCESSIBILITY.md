# Accessibility Notes

Mosslight UI follows WAI-ARIA Authoring Practices where a component maps to a known pattern.

## Implemented

- `Dialog`
  - `role="dialog"`
  - `aria-modal="true"`
  - generated title and description ids
  - Escape close support
  - focus moves into the dialog on open
  - Tab/Shift+Tab wraps within the dialog
  - focus restores to the previously focused element on close
- `Tabs`
  - `role="tablist"`, `role="tab"`, and `role="tabpanel"`
  - roving `tabIndex`
  - Arrow, Home, and End key navigation
  - automatic and manual activation modes
- `Accordion`
  - button triggers with `aria-expanded`
  - trigger-to-panel `aria-controls`
  - Arrow, Home, and End key navigation
  - controlled and uncontrolled state
- `Tooltip`
  - `role="tooltip"`
  - `aria-describedby` while open
  - hover, focus, blur, mouseleave, and Escape behavior
- Forms
  - label-to-control association
  - `aria-invalid` for error states
  - `aria-describedby` for hints and errors

## References

- WAI-ARIA Dialog Modal Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- WAI-ARIA Tabs Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- WAI-ARIA Accordion Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
- WAI-ARIA Tooltip Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/

## Known Limits

Mosslight UI is still a small library. Complex production needs such as nested modals, collision-aware floating overlays, typeahead menus, and virtualized composite widgets should be validated in the consuming app.
