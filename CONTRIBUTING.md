# Contributing

## Local Setup

```bash
npm install
npm run storybook
```

## Quality Gates

Run these before opening a pull request:

```bash
npm test
npm run build
npm run build-storybook
```

For release-level validation:

```bash
npm run release:check
```

## Component Changes

- Add or update tests for the behavior being changed.
- Add or update Storybook stories for public component states.
- Keep public props stable unless the change is intentionally breaking and documented in `CHANGELOG.md`.
