
# TypeScript wrapper for the mailcow API
[![npm version](https://img.shields.io/npm/v/ts-mailcow-api)](https://www.npmjs.com/package/ts-mailcow-api)
[![Build Status](https://github.com/JustSamuel/ts-mailcow-api/actions/workflows/lint-and-build.yml/badge.svg)](https://github.com/JustSamuel/ts-mailcow-api/actions/workflows/lint-and-build.yml)
[![License](https://img.shields.io/npm/l/ts-mailcow-api)](https://github.com/JustSamuel/ts-mailcow-api/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dt/ts-mailcow-api)](https://www.npmjs.com/package/ts-mailcow-api)
[![GitHub Pages](https://img.shields.io/badge/view-GitHub%20Pages-blue?logo=github)](https://justsamuel.github.io/ts-mailcow-api/classes/MailcowClient.html)

Provides typing and a easy to use interface for the [Mailcow API](https://mailcow.docs.apiary.io/#).

## Usage

The interface is exposed via the `MailcowClient` class. It's typedoc reference can be found [here](https://justsamuel.github.io/ts-mailcow-api/classes/MailcowClient.html).

To use the client, create a new wrapper using the base url and API_KEY.

```ts
import MailCowClient from "./index";

// Create MailCowClient based on BASE_URL and API_KEY
const mcc = new MailCowClient(
  "https://demo.mailcow.email/api/v1",
  "390448-22B69F-FA37D9-19701B-6F033F",
);
```

Then you can use the created wrapper for promised-based API calls according to the Mailcow API specification.

```ts
// Get all the mailboxes available.
mcc.mailbox
  .get()
  .then((e) => {
    // Print all mailboxes.
    console.log(JSON.stringify(e, null, 4));
  })
  .catch((e) => {
    // Error handling.
    console.log(e);
  });
```

## Why it's not auto-generated

The [Mailcow OpenAPI spec](https://github.com/mailcow/mailcow-dockerized/blob/master/data/web/api/openapi.yaml) doesn’t pass validation and isn’t RESTful (e.g. `POST /api/v1/add/domain`).
If Mailcow ever fixes the naming or structure, a generated client would break.
This wrapper acts as a middleman, so those changes can be patched internally without ruining the client interface.