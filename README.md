# TypeScript wrapper for the mailcow API.

Provides typing and a easy to use interface for the [Mailcow API](https://mailcow.docs.apiary.io/#).
## Usage
Create a new wrapper using the base url and API_KEY.
```ts
import MailCowClient from "./index";

// Create MailCowClient based on BASE_URL and API_KEY
const mcc = new MailCowClient("https://demo.mailcow.email/api/v1", "390448-22B69F-FA37D9-19701B-6F033F");
```
Then you can use the created wrapper for promised-based API calls according to the Mailcow API specification.
```ts
// Get all the mailboxes available.
mcc.mailbox.get().then((e) => {
    // Print all mailboxes.
    console.log(JSON.stringify(e, null, 4));
}).catch(e => {
    // Error handling.
    console.log(e)
})
```

## API implementation progress
### Domains
- [x] Create domain
- [x] Delete domain
- [x] Update domain
- [x] Get domain

### Domain antispam policies
- [x] Create domain policy
- [x] Delete domain policy
- [x] List blacklist/whitelist domain policy

### Mailboxes
- [x] Create mailbox
- [x] Delete mailbox
- [x] Update mailbox
- [x] Update Pushover settings
- [x] Quarantine Notifications
- [x] Update mailbox ACL
- [x] Get mailboxes
- [x] Edit mailbox spam filter score
- [x] Get Active User Sieve

### Aliases
- [x] Create alias
- [x] Delete alias
- [x] Update alias
- [x] Get aliases

### Sync Jobs
- [ ] Create sync job
- [ ] Delete sync job
- [ ] Update sync job
- [ ] Get sync jobs

### Forwarding Hosts
- [ ] Add Forward Host
- [ ] Delete Forward Host
- [ ] Get Forwarding Hosts

### Logs
- [ ] Get ACME logs
- [ ] Get Api logs
- [ ] Get Autodiscover logs
- [ ] Get Dovecot logs
- [ ] Get Netfilter logs
- [ ] Get Postfix logs
- [ ] Get Ratelimit logs
- [ ] Get Rspamd logs
- [ ] Get SOGo logs
- [ ] Get Watchdog logs

### Queue Manager
- [ ] Delete Queue
- [ ] Flush Queue
- [ ] Get Queue

### Quarantine
- [ ] Delete mails in Quarantaine
- [ ] Get mails in Quarantaine

### Fail2Ban
- [ ] Edit Fail2Ban
- [ ] Get Fail2Ban Config

### DKIM
- [ ] Generate DKIM key
- [ ] Duplicate DKIM key
- [ ] Delete DKIM key
- [ ] Get DKIM key

### Domain Admin
- [ ] Create Domain Admin user
- [ ] Edit Domain Admin ACL
- [ ] Edit Domain Admin user
- [ ] Delete Domain Admin
- [ ] Get Domain Admins

### Address Rewriting
- [ ] Create BCC Map
- [ ] Create Recipient Map
- [ ] Delete BCC Map
- [ ] Delete Recipient Map
- [ ] Get BCC Map
- [ ] Get Recipient Map

### Outgoing TLS Policy Map Overrides
- [ ] Create TLS Policy Map
- [ ] Delete TLS Policy Map
- [ ] Get TLS Policy Map

### oAuth Clients
- [ ] Create oAuth client
- [ ] Delete oAuth client
- [ ] Get oAuth Clients

### Routing
- [ ] Create Sender-Dependent Transports
- [ ] Create Transport Maps
- [ ] Delete Sender-Dependent Transports
- [ ] Delete Transport Maps
- [ ] Get Sender-Dependent Transports
- [ ] Get Transport Maps

### Resources
- [ ] Create Resources
- [ ] Delete Resources
- [ ] Get Resources

### App Passwords
- [ ] Create App Passwords
- [ ] Delete App Passwords
- [ ] Get App Passwords

### Status
- [ ] Get container status
- [ ] Get solr status
- [ ] Get vmail status

### Ratelimits
- [ ] Get mailbox ratelimits
- [ ] Get domain ratelimits
- [ ] Edit domain ratelimits
- [ ] Edit mailbox ratelimits