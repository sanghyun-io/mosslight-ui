# Theming

Mosslight UI exposes raw palette tokens and semantic tokens. Prefer semantic tokens when extending components.

## Semantic Tokens

- `--ms-surface-page`
- `--ms-surface-panel`
- `--ms-surface-muted`
- `--ms-text-primary`
- `--ms-text-muted`
- `--ms-accent-primary`
- `--ms-accent-primary-soft`
- `--ms-accent-secondary`
- `--ms-accent-warning`
- `--ms-accent-danger`

## Built-In Theme Attributes

```html
<div data-ms-theme="dark">
  ...
</div>
```

```html
<div data-ms-density="compact">
  ...
</div>
```

Supported density values:

- `compact`
- `comfortable`

The default density is the base token set on `:root`.
