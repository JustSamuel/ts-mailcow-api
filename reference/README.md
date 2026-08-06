# Reference material

Upstream Mailcow API definitions vendored into this repo as a frozen
reference. This is **not** authoritative for the wrapper -- the wrapper
implements what the live Mailcow PHP API actually accepts, which is
occasionally a superset of what the spec documents (for example
`get/active-user-sieve` is implemented but not specified).

## openapi.yaml

Snapshot of
[`data/web/api/openapi.yaml`](https://github.com/mailcow/mailcow-dockerized/blob/master/data/web/api/openapi.yaml)
from the `mailcow/mailcow-dockerized` repository.

- Source commit: `06424670fa5d60fee851f58bfc49f66086d5f0a6`
- Snapshot date: 2026-08-06

### Refresh

```bash
curl -sSL https://raw.githubusercontent.com/mailcow/mailcow-dockerized/master/data/web/api/openapi.yaml \
  -o reference/openapi.yaml
```

Then update the source commit SHA and date above. Re-run the parity
check (see CLAUDE.md) when you do this.

## License

The upstream OpenAPI spec is part of the AGPL-3.0-licensed
mailcow-dockerized project. This wrapper is also AGPL-3.0, so vendoring
the spec is compatible.
