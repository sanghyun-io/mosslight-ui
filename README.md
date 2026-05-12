# Mosslight UI

Warm fantasy React UI primitives with moss, parchment, sky accents, tactile borders, and restrained ambient motion.

The style intentionally avoids copying a specific anime frame, character, logo, or trademarked visual identity. It translates the broad mood into original product UI primitives: softened contrast, moss and sky accents, inked borders, tactile shadows, and restrained ambient motion.

## Documentation

- GitHub Pages: https://sanghyun-io.github.io/mosslight-ui/
- Storybook locally: `npm run storybook`

## Install

Until the package is published to npm, install from GitHub:

```bash
npm install github:sanghyun-io/mosslight-ui
```

After npm publication:

```bash
npm install mosslight-ui
```

## Usage

```tsx
import { Button, Card } from "mosslight-ui";
import "mosslight-ui/styles.css";

export function Example() {
  return (
    <Card>
      <Button>Begin journey</Button>
    </Card>
  );
}
```

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Storybook

```bash
npm run storybook
```

## Package Shape

- `src/styles/tokens.css`: color, radius, typography, shadow, and motion tokens
- `src/styles/components.css`: reusable component classes
- `src/components`: React component primitives
- `src/App.tsx`: live demo surface
- `src/stories`: Storybook examples for the public component surface

## Components

- `Badge`
- `Button`
- `Card`
- `Dialog`
- `Field`
- `Select`
- `Switch`
- `Tabs`
- `Toast`

## Publishing

The repo is configured for GitHub Pages through `.github/workflows/pages.yml`.
The npm package surface is validated with:

```bash
npm run build
npm pack --dry-run
```

## Design Notes

- Keep text compact and calm; the UI should feel useful before it feels decorative.
- Use warm neutrals as background, but balance them with moss, sky, ink, plum, and amber accents.
- Prefer low, soft motion: hover lift, slow atmospheric drift, small focus glows.
- Use illustrated or material cues sparingly so the components remain usable in real apps.
