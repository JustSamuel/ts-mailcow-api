# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.8.0]

### Added
- `force_tfa` on `BaseMailboxAttributes` (optional), so `MailboxPostRequest`
  and `MailboxEditAttributes` can set it. Mirrors Mailcow's
  `add/mailbox` and `edit/mailbox` behaviour, which default it to `false`
  when omitted.
- `sender_acl` (top-level) and `force_tfa` (nested under `attributes`) on
  the `Mailbox` response type, matching what `get/mailbox/{id}` and
  `get/mailbox/all/{domain}` actually return. Note that `force_tfa` lives
  under `attributes` rather than top-level as originally proposed in the
  issue -- verified against Mailcow's PHP source, which stores and
  returns it alongside `force_pw_update` and the other `attributes`
  fields.

Closes [#74](https://github.com/JustSamuel/ts-mailcow-api/issues/74).

## [1.7.0]

### Added
- `mcc.aliases.createTimeLimited(payload)` / `getTimeLimited(mailbox)` --
  create and list Mailcow's time-limited (burner) aliases. Wraps
  `add/time_limited_alias` and `get/time_limited_aliases/{mailbox}`.
- `mcc.aliases.editTimeLimited(payload)` / `deleteTimeLimited(payload)` --
  extend, make permanent, or remove a time-limited alias. Wraps
  `edit/time_limited_alias` and `delete/time_limited_alias`, which exist
  in the live API but aren't documented in the upstream spec.
- `TimeLimitedAlias`, `TimeLimitedAliasPostRequest`,
  `TimeLimitedAliasEditRequest`, and `TimeLimitedAliasDeleteRequest` types.

Closes [#48](https://github.com/JustSamuel/ts-mailcow-api/issues/48).

## [1.6.0]

### Added
- `mcc.quarantine.edit(payload)` -- act on quarantined messages. Wraps
  `edit/qitem`. Supports the two actions Mailcow documents: `release`
  (deliver to the recipient's inbox) and `learnham` (feed back to
  Rspamd as a false positive). Previously the wrapper could only list
  and delete quarantined items.
- `QuarantineItemAction` and `EditQuarantineItemRequest` types.

Closes [#47](https://github.com/JustSamuel/ts-mailcow-api/issues/47).

## [1.5.0]

### Added
- `mcc.identityProvider.edit(attr)` -- configure Mailcow's external
  Identity Provider (Keycloak, LDAP, or generic OIDC). Wraps the
  `edit/identity-provider` route added in Mailcow's Moo 2025 update.
- Discriminated-union types on `authsource` so TypeScript enforces the
  right combination of fields per provider:
  `KeycloakIdentityProviderAttributes`, `LdapIdentityProviderAttributes`,
  `GenericOidcIdentityProviderAttributes`, and the union
  `IdentityProviderAttributes`.
- Unit tests covering each of the three authsource shapes against
  mocked axios.

Closes [#38](https://github.com/JustSamuel/ts-mailcow-api/issues/38).

## [1.4.0]

### Added
- Unit tests for `RequestFactory` and a representative set of endpoints,
  running against a mocked axios. `yarn test` now runs these in milliseconds
  instead of hitting the public demo.
- `yarn test:smoke` script to run the live suite against
  `demo.mailcow.email` when explicitly requested.

### Changed
- `tsconfig.json` -> `strictNullChecks: true`. Surfaced one real issue
  (see Fixed).
- `MailcowException` now has an explicit constructor that calls
  `super(message)` and sets `this.name = 'MailcowException'`. Previously
  the class redeclared `message: string` without an initializer and
  relied on `Error`'s inherited constructor; this tripped the new
  `strictNullChecks` pass and also meant `err.name` was `'Error'` instead
  of `'MailcowException'`.
- Live tests moved from `test/index.test.ts` to `test/smoke.test.ts` and
  gated behind `MAILCOW_E2E=1`. The `isSucces` typo in that file is
  also fixed.

### Fixed
- `RequestFactory.post`/`.get` were previously not unit-tested. The new
  suite confirms: 2XX bodies with `type: "danger"` or `type: "error"`
  throw `MailcowException`; axios errors with a Mailcow-shaped response
  are unwrapped; axios errors without one fall through to a generic
  `MailcowException`; non-axios errors rethrow untouched.

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
  npm via OIDC trusted publishing (no `NPM_TOKEN` needed, with provenance),
  replacing the local `postpublish` git-tag dance.
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

[1.6.0]: https://github.com/JustSamuel/ts-mailcow-api/releases/tag/v1.6.0
[1.5.0]: https://github.com/JustSamuel/ts-mailcow-api/releases/tag/v1.5.0
[1.4.0]: https://github.com/JustSamuel/ts-mailcow-api/releases/tag/v1.4.0
[1.3.0]: https://github.com/JustSamuel/ts-mailcow-api/releases/tag/v1.3.0
[1.2.0]: https://github.com/JustSamuel/ts-mailcow-api/releases/tag/v1.2.0
[1.1.0]: https://github.com/JustSamuel/ts-mailcow-api/releases/tag/v1.1.0
[1.0.0]: https://github.com/JustSamuel/ts-mailcow-api/releases/tag/v1.0.0
