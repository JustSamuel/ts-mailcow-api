# TypeScript wrapper for the mailcow API
[![npm version](https://img.shields.io/npm/v/ts-mailcow-api)](https://www.npmjs.com/package/ts-mailcow-api)
[![Build Status](https://github.com/JustSamuel/ts-mailcow-api/actions/workflows/lint-and-build.yml/badge.svg)](https://github.com/JustSamuel/ts-mailcow-api/actions/workflows/lint-and-build.yml)
[![License](https://img.shields.io/npm/l/ts-mailcow-api)](https://github.com/JustSamuel/ts-mailcow-api/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dt/ts-mailcow-api)](https://www.npmjs.com/package/ts-mailcow-api)
[![GitHub Pages](https://img.shields.io/badge/view-GitHub%20Pages-blue?logo=github)](https://justsamuel.github.io/ts-mailcow-api/classes/MailcowClient.html)

Typed, promise-based client for the [Mailcow API](https://mailcow.docs.apiary.io/#).

- Node 22+
- Single runtime dependency (`axios`)
- Full typedoc reference: https://justsamuel.github.io/ts-mailcow-api/classes/MailcowClient.html

## Install

```bash
yarn add ts-mailcow-api
# or
npm install ts-mailcow-api
```

## Usage

Create a client with a base URL and API key:

```ts
import MailcowClient from "ts-mailcow-api";

const mcc = new MailcowClient(
  "https://demo.mailcow.email/api/v1",
  "390448-22B69F-FA37D9-19701B-6F033F",
);
```

> The key above is the public Mailcow demo key, shared with anyone testing
> against `demo.mailcow.email`. Do not copy it into production code.

Then call any endpoint group as a promise:

```ts
const mailboxes = await mcc.mailbox.get("all");
console.log(mailboxes);
```

### Custom axios config (self-signed certs, proxies, keep-alive)

The third constructor argument is forwarded into the underlying axios config:

```ts
import https from "node:https";

const mcc = new MailcowClient(BASE_URL, API_KEY, {
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  timeout: 10_000,
});
```

### Error handling

Mailcow returns errors as a 2XX response with `type: "danger"` or
`type: "error"` in the body. This client unwraps that into a thrown
`MailcowException`, so a single `try / catch` works for both transport-level
and API-level failures:

```ts
import { MailcowException } from "ts-mailcow-api";

try {
  await mcc.aliases.create({ /* ... */ });
} catch (e) {
  if (e instanceof MailcowException) {
    console.error("Mailcow rejected the request:", e.message);
  } else {
    throw e;
  }
}
```

## Endpoint groups

The `MailcowClient` exposes one property per Mailcow resource. Each one points
at a typed interface documented in the
[typedoc reference](https://justsamuel.github.io/ts-mailcow-api/classes/MailcowClient.html).

| Property           | Resource                          |
| ------------------ | --------------------------------- |
| `addressRewriting` | BCC and recipient maps            |
| `aliases`          | Aliases                           |
| `appPasswords`     | App passwords                     |
| `dkim`             | DKIM keys                         |
| `domainAdmins`     | Domain administrators             |
| `domains`          | Domains                           |
| `fail2Ban`         | Fail2Ban configuration            |
| `forwardingHosts`  | Forwarding hosts                  |
| `logs`             | ACME, API, dovecot, postfix, ...  |
| `mailbox`          | Mailboxes (and ACL, pushover, ...)|
| `oauth2`           | OAuth2 clients                    |
| `quarantine`       | Quarantine                        |
| `queueManager`     | Mail queue                        |
| `ratelimits`       | Domain and mailbox rate limits    |
| `resources`        | Shared resources                  |
| `routing`          | Relay hosts and transport maps    |
| `spamPolicy`       | Anti-spam policies                |
| `status`           | Container, vmail, version status  |
| `syncjobs`         | IMAP sync jobs                    |
| `tlsPolicyMaps`    | TLS policy maps                   |

## Why this is not auto-generated

The [Mailcow OpenAPI spec](https://github.com/mailcow/mailcow-dockerized/blob/master/data/web/api/openapi.yaml)
does not pass validation and is not RESTful (for example, `POST /api/v1/add/domain`).
If Mailcow ever fixes the naming or structure, a generated client would break.
This wrapper acts as a middleman, so those changes can be patched internally
without ruining the client interface.

## License

[AGPL-3.0-only](LICENSE).
