# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0]

### Added
- Canonical export `AddressRewritingEndpoints` (the misspelled
  `AdressRewritingEndpoints` remains as a `@deprecated` alias).
- Canonical export `QuarantineEditRequest` (the misspelled
  `QuarantaineEditRequest` remains as a `@deprecated` alias).
- `MailcowException` is now re-exported from the package entry point.
  Previously `src/index.ts` only forwarded types, so the runtime class
  could not be imported from `ts-mailcow-api`.
- `CLAUDE.md` with conventions for future contributors.
- `.github/workflows/release.yml` -- manual `workflow_dispatch` publish to
  npm, replacing the local `postpublish` git-tag dance.
- `.github/workflows/codeql.yml` -- weekly CodeQL scan.

### Changed
- License field in `package.json` corrected from `ISC` to `AGPL-3.0-only`
  to match the bundled `LICENSE` file.
- Dependabot now targets the default branch, has a 7-day cooldown, and
  also watches `github-actions`.
- TypeDoc deploy now uses the native `actions/deploy-pages` action with a
  least-privilege `permissions:` block and a `concurrency:` group.
- `lint-and-build` runs on all pull requests, not just those targeting
  master.
- `tsconfig.json` bumped to `target: ES2022`, removed a stale `exclude` for
  a non-existent file and the duplicate `typedocOptions` block (canonical
  config lives in `typedoc.json`).
- `RequestFactory` `post`/`get` share a single private `request` helper.
- `mailbox.editQuarantine` now uses the `MAILBOX_ENDPOINTS.EDIT_QUARANTINE`
  constant instead of a hardcoded route string.

### Removed
- Root-level `index.js` (dead CommonJS shim; `main` already points at
  `dist/index.js`).
- `.npmignore` (the `files: ["dist"]` allow-list in `package.json` is
  authoritative).
- `postpublish` script that auto-tagged on local `yarn publish`. The new
  `release.yml` workflow does this in CI.

### Fixed
- Two JSDoc typos in `src/types.ts` ("adress" -> "address").

## [1.2.0]

- Add `authsource` property to mailboxes.
- Fix typo in keycloak.

## [1.1.0]

- Stricter error handling: 2XX responses with an error-typed body now also
  throw `MailcowException`.

## [1.0.0]

- Add routing endpoints.
- Add domain admin endpoints.
- Add DKIM endpoints.
- Add TLS policy map endpoints.
- Add app password endpoints.
- Add OAuth2 endpoints.
- Add ratelimit endpoints.
- Add quarantine endpoints.
- Add queue manager endpoints.
- Add resource endpoints.
- Add status endpoints.
- Move `/api/v1` out of the client into the user-supplied base URL.

[1.3.0]: https://github.com/JustSamuel/ts-mailcow-api/releases/tag/v1.3.0
[1.2.0]: https://github.com/JustSamuel/ts-mailcow-api/releases/tag/v1.2.0
[1.1.0]: https://github.com/JustSamuel/ts-mailcow-api/releases/tag/v1.1.0
[1.0.0]: https://github.com/JustSamuel/ts-mailcow-api/releases/tag/v1.0.0
