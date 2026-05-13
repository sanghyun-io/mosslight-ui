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

For the first npm release, publish once with an npm account that should own
`mosslight-ui`. npm trusted publisher configuration is attached to an existing
package, so configure it after the initial package exists on the registry.

Publishing through GitHub Actions with npm trusted publishing:

1. On npmjs.com, add a trusted publisher for the package.
2. Use these GitHub Actions values:
   - Organization or user: `sanghyun-io`
   - Repository: `mosslight-ui`
   - Workflow filename: `publish.yml`
3. Run the `Publish to npm` workflow manually from GitHub Actions.

The workflow uses GitHub Actions OIDC instead of a long-lived npm token. npm automatically generates provenance for trusted publishing, and `prepublishOnly` runs the full `release:check` gate before the package is published.

If the publish workflow fails with:

```text
npm error 404 Not Found - PUT https://registry.npmjs.org/mosslight-ui
npm error 404 The requested resource 'mosslight-ui@0.1.0' could not be found or you do not have permission to access it.
```

the package build has reached npm, but the registry has not accepted the package owner or trusted publisher identity yet. For the initial release, publish locally with the intended npm owner. After the package exists, add the trusted publisher above and rerun the `Publish to npm` workflow for future releases.

The package name `mosslight-ui` was available when the initial public repository was created. Re-check the registry before the first npm publish.
