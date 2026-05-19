# CLAUDE.md

Notes for Claude (and other agents) working in this repo.

## What this is

A typed promise-based wrapper for the Mailcow API. Published to npm as
`ts-mailcow-api`. **It is a public library** -- treat exported names as a
contract.

## Layout

- `src/client.ts` -- the `MailcowClient` class. It owns one property per
  endpoint group and instantiates each group via its factory function.
- `src/endpoints/*.ts` -- one file per resource. Each file exports:
  1. An `XEndpoints` interface describing the public methods.
  2. An `xEndpoints(bind: MailcowClient): XEndpoints` factory.
- `src/types.ts` -- the single source of truth for request/response types
  (~2.5k lines). Also exports the runtime `MailcowException` class.
- `src/request-factory.ts` -- thin axios wrapper. Centralises Mailcow's
  "2XX response with error-typed body" handling: see `checkMailcowResponse`.
  `wrapPromiseToArray` is exported for endpoints whose Mailcow response is
  `T | T[]` and should be normalised to `T[]`.
- `test/smoke.test.ts` -- live smoke tests against `demo.mailcow.email`,
  gated behind `MAILCOW_E2E=1`.
- `test/request-factory.test.ts` and `test/endpoints.test.ts` -- unit
  tests against mocked axios; run by default with `yarn test`.

## Adding an endpoint

1. Add the request/response types to `src/types.ts`.
2. Create `src/endpoints/<name>-endpoints.ts` with the interface + factory.
3. Wire it onto `MailcowClient` in `src/client.ts` (import + public property).

## Commands

- `yarn lint` -- ESLint.
- `yarn format` / `yarn format:fix` -- Prettier check / write.
- `yarn build` -- TypeScript compile to `dist/`.
- `yarn test` -- unit tests (request-factory, endpoints) against mocked
  axios. Fast; safe to run in CI. The live smoke suite in `smoke.test.ts`
  is gated behind `MAILCOW_E2E=1` and is skipped by default.
- `yarn test:smoke` -- runs the live suite against `demo.mailcow.email`.
  Slow, shares state with anyone else hitting the demo, and most
  assertions are non-fatal warnings rather than hard failures.
- `yarn docs` -- regenerate TypeDoc into `docs/` (deployed to GitHub Pages
  on every push to master).

## Rules

- **Do not rename or remove an exported symbol without a deprecation alias.**
  Keep the old name as `@deprecated` and only remove it on a major bump.
  Past examples: `AddressRewritingEndpoints` (was `Adress...`),
  `QuarantineEditRequest` (was `Quarantaine...`).
- **Don't reach into endpoint files from the client.** The factory pattern is
  the only seam.
- Mailcow uses `POST` for everything including deletes. Don't try to be
  RESTful here -- mirror the upstream routes.
- Run `yarn build` before claiming a change works. The TS config is strict
  enough that the type errors are usually the bug.
