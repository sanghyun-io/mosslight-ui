# Release Checklist

Run this before publishing a package release:

```bash
npm run release:check
```

Then verify:

- `CHANGELOG.md` has the release notes.
- `package.json` has the intended version.
- Storybook renders locally or on GitHub Pages.
- The package tarball includes `dist/index.d.ts`, `dist/styles.css`, and `dist/styles.css.d.ts`.
- `scripts/verify-dist.mjs` passes without test or story declarations leaking into `dist`.

Publishing to npm:

```bash
npm publish
```

Publishing through GitHub Actions:

1. Create an npm automation token with publish access.
2. Add it to the GitHub repository as the `NPM_TOKEN` Actions secret.
3. Run the `Publish to npm` workflow manually from GitHub Actions.

The workflow runs `npm publish --provenance`, and `prepublishOnly` runs the full `release:check` gate before the package is published.

The package name `mosslight-ui` was available when the initial public repository was created. Re-check the registry before the first npm publish.
