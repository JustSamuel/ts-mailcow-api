/**
 * Base attributes of a domain.
 */
export interface BaseDomainAttributes {
  /**
   * The language code associated with this domain.
   */
  lang: 'sk' | 'cs' | 'de' | 'en' | 'es' | 'fr' | 'lv' | 'nl' | 'pl' | 'pt' | 'ru' | 'it' | 'ca';
  /**
   * Boolean if the domain is active.
   */
  active: boolean;
  /**
   * Amount of aliases in the domain.
   */
  aliases: number;
  /**
   * Boolean to relay domain or not.
   */
  backupmx: number;
  /**
   * The predefined mailbox quota in add mailbox form
   */
  defquota: number;
  /**
   * The description of the domain.
   */
  description: string;
  /**
   * The limit count of mailboxes associated with this domain.
   */
  mailboxes: number;
  /**
   * The maximum quota per mailbox.
   */
  maxquota: number;
  /**
   * The maximum quota for this domain (sum of all mailboxes).
   */
  quota: number;
  /**
   * If not, then you have to create "dummy" mailbox for each address to relay
   */
  relay_all_recipients: boolean;
}

/**
 * Relay interval settings.
 */
type RelayFrame = 's' | 'm' | 'h' | 'd';

/**
 * Domain creation payload.
 */
export interface DomainPostRequest extends BaseDomainAttributes {
  /**
   * The domain to create.
   */
  domain: string;
  /**
   * The frame of the relay setting.
   */
  rl_frame: RelayFrame;
  /**
   * The value of the relay setting.
   */
  rl_value: number;
  /**
   * If true: sogo will restart after domain creation.
   */
  restart_sogo: boolean;
}

/**
 * Domain delete request.
 */
export interface DomainDeleteRequest {
  /**
   * List of domains to delete.
   */
  domains: string[];
}

/**
 * All attributes of the domain you can edit.
 */
export interface DomainEditAttributes extends BaseDomainAttributes {
  /**
   *  Is domain global address list active or not, it enables shared contacts across domain in SOGo webmail
   */
  gal: boolean;
  /**
   * Id of the relayhost.
   */
  relayhost: number;
}

/**
 * Domain edit request.
 */
export interface DomainEditRequest {
  /**
   * Possible attributes you can edit.
   */
  attr: Partial<DomainEditAttributes>;
  /**
   * Domains you wish to edit.
   */
  items: string | string[];
}

/**
 * Interface of the Domain as returned by Mailcow.
 */
export interface Domain {
  /**
   * 0 = False, 1 = True.
   */
  active: number;
  /**
   * Amount of aliases in this domain.
   */
  aliases_in_domain: number;
  /**
   * Amount of aliases remaining in the alias quota.
   */
  aliases_left: number;
  /**
   * If backupmx is activated.
   */
  backupmx?: boolean;
  /**
   * Total amount of bytes used by this domain.
   */
  bytes_total?: number;
  /**
   * New mailbox quota.
   */
  def_new_mailbox_quota?: number;
  /**
   * Quota for a mailbox.
   */
  def_quota_for_mbox?: number;
  /**
   * Description of the domain.
   */
  description: string;
  /**
   * Name of the domain.
   */
  domain_name: string;
  /**
   *  Is domain global address list active or not, it enables shared contacts across domain in SOGo webmail
   */
  gal: boolean;
  /**
   * Max quota for new mailboxes.
   */
  max_new_mailbox_quota?: string;
  /**
   * Max quota aliases on this domain.
   */
  max_num_aliases_for_domain?: number;
  /**
   * Max number of mailboxes in this domain.
   */
  max_num_mboxes_for_domain: number;
  /**
   * Max quota for this domain.
   */
  max_quota_for_domain: number;
  /**
   * Max quota for a mailbox.
   */
  max_quota_for_mbox: number;
  /**
   * Amount of mailboxes in this domain.
   */
  mboxes_in_domain: number;
  /**
   * Amount of mailboxes left in the quota.
   */
  mboxes_left: number;
  /**
   * Amount of total messages in this domain.
   */
  msgs_total: number;
  /**
   * Quota used in this domain.
   */
  quota_used_in_domain: number;
  /**
   * If all mails are relayed.
   */
  relay_all_recipients?: boolean;
  /**
   * Id of the relay host
   */
  relayhost?: number;
  /**
   * If the domain is relayed.
   */
  rl: boolean | { value: string; frame: string };
  /**
   * If XMPP is enable.d
   */
  xmpp: boolean;
  /**
   * The XMPP prefix.
   */
  xmpp_prefix: string;
  /**
   * Integer representation of the boolean.
   */
  gal_int: number;
  /**
   * Integer representation of the boolean.
   */
  active_int: number;
  /**
   * Integer representation of the boolean.
   */
  relay_all_recipients_int: boolean;
  /**
   * If the domain should only relay unknown addresses.
   */
  relay_unknown_only: boolean;
  /**
   * Integer representation of the boolean.
   */
  relay_unknown_only_int: boolean;
  /**
   * List of domain admins
   */
  domain_admins: string[];
}

/**
 * Antispam policy creation request.
 */
export interface SpamPolicyPostRequest {
  /**
   * Domain for which the policies applies.
   */
  domain: string;
  /**
   * The 'from' parameter off the antispam policy
   */
  object_from: string;
  /**
   * Use 'wl' for whitelist and 'bl' for blacklist.
   */
  object_list: 'wl' | 'bl';
}

/**
 * Antispam deletion request.
 */
export interface SpamPolicyDeleteRequest {
  /**
   * IDs of the policies to delete.
   */
  prefid: number[];
}

/**
 * Antispam policy get request.
 */
export interface SpamPolicyGetRequest {
  /**
   * Use 'wl' to get whitelist policies and use 'bl' to get blacklist policies.
   */
  type: 'wl' | 'bl';
  /**
   * The exact address or use wildcard to match whole domain.
   */
  domain: string;
}

/**
 * Interface of the Antispam Policy as returned by Mailcow.
 */
export interface SpamPolicy {
  /**
   * The domain of the policy.
   */
  object: string;
  /**
   * The address of the policy.
   */
  value: string;
  /**
   * The ID of the policy.
   */
  prefid: number;
}

/**
 * Base attributes of a mailbox.
 */
export interface BaseMailboxAttributes {
  /**
   * Integer representing if the mailbox is active (allows for custom states).
   */
  active: number;
  /**
   * Boolean if the user is forced to update their password on login.
   */
  force_pw_update: boolean;
  /**
   * Boolean if the user is forced to enroll in two-factor authentication on
   * login. Optional -- Mailcow falls back to its configured default
   * (`false` out of the box) when omitted.
   */
  force_tfa?: boolean;
  /**
   * The ull name of the mailbox user.
   */
  name: string;
  /**
   * The mailbox password.
   */
  password: string;
  /**
   * The mailbox password for confirmation.
   */
  password2: string;
  /**
   * The mailbox quota.
   */
  quota: number;
  /**
   * The authentication source for this mailbox.
   */
  authsource: 'mailcow' | 'ldap' | 'keycloak' | 'generic-oidc';
}

/**
 * Mailbox creation request.
 */
export interface MailboxPostRequest extends BaseMailboxAttributes {
  /**
   * The domain of the mailbox.
   */
  domain: string;
  /**
   * The local part of the mailbox.
   */
  local_part: string;
  /**
   * Boolean if inbound email encryption is forced.
   */
  tls_enforce_in: boolean;
  /**
   * Boolean if outbound email encryption is forced.
   */
  tls_enforce_out: boolean;
}

/**
 * Mailbox deletion request.
 */
export interface MailboxDeleteRequest {
  /**
   * List of mailboxes to delete.
   */
  mailboxes: string[];
}

/**
 * Attributes of the mailbox you can edit.
 */
export interface MailboxEditAttributes extends BaseMailboxAttributes {
  /**
   * List of allowed send from addresses.
   */
  sender_acl: string[];
  /**
   * Boolean iff mailbox has SOGo acces.
   */
  sogo_access: boolean;
}

/**
 * Mailbox update request.
 */
export interface MailboxEditRequest {
  /**
   * List of attributes you wish to update.
   */
  attr: Partial<MailboxEditAttributes>;
  /**
   * List of mailboxes to edit.
   */
  items: string[];
}

/**
 * Possible options for the Quarantine time frames.
 */
type QuarantineSchedule = 'hourly' | 'daily' | 'weekly' | 'never';

/**
 * Options of what should happen if email is quarantined.
 */
type QuarantineCategory = 'reject' | 'add_header' | 'all';

/**
 * Interface of the Mailbox as returned by Mailcow.
 */
export interface Mailbox {
  /**
   * The full mailbox name, equal to local_part@domain
   */
  username: string;
  /**
   * Boolean if the mailbox is active.
   */
  active: boolean;
  /**
   * Int representation of the boolean.
   */
  active_int: number;
  /**
   * Domain of the mailbox.
   */
  domain: string;
  /**
   * Boolean if XMPP is enabled for this domain.
   */
  domain_xmpp?: boolean;
  /**
   * Name of the user belonging to the mailbox.
   */
  name: string;
  /**
   * The prefix used for the XMPP login.
   */
  domain_xmpp_prefix?: string;
  /**
   * The local part of the mailbox.
   */
  local_part: string;
  /**
   * The quota of the mailbox.
   */
  quota: number;
  /**
   * Amount of messages in the mailbox.
   */
  messages: number;
  /**
   * Attributes belonging to this mailbox
   */
  attributes: {
    /**
     * Boolean if the user is forced to update their password on login.
     */
    force_pw_update: boolean;
    /**
     * Boolean if the user is forced to enroll in two-factor authentication
     * on login.
     */
    force_tfa: boolean;
    /**
     * Boolean if inbound email encryption is forced.
     */
    tls_enforce_in: boolean;
    /**
     * Boolean if outbound email encryption is forced.
     */
    tls_enforce_out: boolean;
    /**
     * Boolean if mailbox has SOGo acces.
     */
    sogo_access: boolean;
    /**
     * Boolean if mailbox has IMAP acces.
     */
    imap_access: boolean;
    /**
     * Boolean if mailbox has POP3 acces.
     */
    pop3_access: boolean;
    /**
     * Boolean if mailbox has SMTP acces.
     */
    smtp_access: boolean;
    /**
     * Boolean if mailbox has XMPP acces.
     */
    xmpp_access: boolean;
    /**
     * Boolean if mailbox is XMPP admin.
     */
    xmpp_admin: boolean;
    /**
     * The format of the mailbox.
     */
    mailbox_format: string;
    /**
     * The schedule on which the mailbox gets quarantine notifications.
     */
    quarantine_notification: QuarantineSchedule;
    /**
     * What happens with the quarantined emails.
     */
    quarantine_category: QuarantineCategory;
  };
  /**
   * Amount of quota used.
   */
  quota_used: number;
  /**
   * Percentage of mailbox quota used.
   */
  percent_in_use: number;
  /**
   * Last IMAP login time in epoch timestamp..
   */
  last_imap_login: number;
  /**
   * Last SMTP login time in epoch timestamp..
   */
  last_smtp_login: number;
  /**
   * Last POP3 login time in epoch timestamp..
   */
  last_pop3_login: number;
  /**
   * Class representation of quota usage.
   */
  percent_class: 'success' | 'warning' | 'danger';
  /**
   * Maximum possible quota.
   */
  max_new_quota: number;
  /**
   * Amount of spam aliases belonging to this mailbox.
   */
  spam_aliases: number;
  /**
   * Boolean if pushover is active.
   */
  pushover_active: boolean;
  /**
   * Relay settings.
   */
  rl: {
    /**
     * Value of the frame settings.
     */
    value: number;
    /**
     * Relay interval.
     */
    frame: RelayFrame;
  };
  /**
   * Scope of the relay.
   */
  rl_scope: string;
  /**
   * Boolean if the mailbox is relayed.
   */
  is_relayed: boolean;
  /**
   * List of allowed send-from addresses for this mailbox.
   */
  sender_acl: string[];
}

/**
 * Pushover settings interface.
 */
export interface PushoverEditAttributes {
  active: boolean;
  evaluate_x_prio: boolean;
  key: string;
  only_x_prio: boolean;
  senders: string;
  senders_regex: string;
  text: string;
  title: string;
  token: string;
}

/**
 * Pushover edit payload.
 */
export interface PushoverEditRequest {
  /**
   * The attributes to edit.
   */
  attr: Partial<PushoverEditAttributes>;
  /**
   * List of mailboxes to edit.
   */
  items: string | string[];
}

/**
 * Quarantine notification edit payload.
 */
export interface QuarantineEditRequest {
  /**
   * The attributes to edit.
   */
  attr: {
    /**
     * How often quarantine notifications should be sent.
     */
    quarantine_notification: QuarantineSchedule;
  };
  /**
   * The mailboxes to edit.
   */
  items: {
    anyOf: string | string[];
  };
}

/**
 * @deprecated Misspelling. Use {@link QuarantineEditRequest} instead. Will be removed in 2.0.0.
 */
export type QuarantaineEditRequest = QuarantineEditRequest;

/**
 * Spam score edit payload.
 */
export interface SpamScoreEditRequest {
  /**
   * Mailboxes to edit.
   */
  items: string | string[];
  /**
   * The attributes to edit.
   */
  attr: {
    /**
     * The spamscore to set, should be of the form 'lowerbound, upperbound'.
     */
    spam_score: string;
  };
}

/**
 * List of possible userACL.
 */
type userAcl =
  | 'spam_alias'
  | 'tls_policy'
  | 'spam_score'
  | 'spam_policy'
  | 'delimiter_action'
  | 'syncjobs'
  | 'eas_reset'
  | 'quarantine'
  | 'sogo_profile_reset'
  | 'quarantine_attachments'
  | 'quarantine_notification'
  | 'app_passwds'
  | 'pushover';

/**
 * ACL Edit payload.
 */
export interface ACLEditRequest {
  /**
   * Mailboxes to edit.
   */
  items: string | string[];
  /**
   * Attributes to set.
   */
  attr: {
    /**
     * List of ACLs to set.
     */
    user_acl: userAcl[];
  };
}

/**
 * Mailbox tag deletion request.
 */
export interface MailboxTagDeleteRequest {
  /**
   * List of tag names to remove from the mailbox.
   */
  items: string[];
}

/**
 * Mailbox custom attribute edit payload. `attribute` and `value` are
 * parallel arrays -- `attribute[i]` is combined with `value[i]` into a
 * single attribute map server-side (`functions.mailbox.inc.php`, case
 * `mailbox_custom_attribute`).
 */
export interface MailboxCustomAttributeEditRequest {
  /**
   * The custom attributes to set.
   */
  attr: {
    /**
     * Attribute keys, parallel to `value`.
     */
    attribute: string[];
    /**
     * Attribute values, parallel to `attribute`.
     */
    value: string[];
  };
  /**
   * Mailboxes to edit.
   */
  items: string | string[];
}

/**
 * Response of the `get/spam-score/{mailbox}` endpoint.
 *
 * Note: the upstream OpenAPI spec documents this key as `spam_score`, but
 * the PHP handler (`json_api.php`, case `spam-score` under the `get`
 * action) wraps the value as `score`.
 */
export interface SpamScoreGetResponse {
  /**
   * The spam score, of the form 'lowerbound,upperbound'.
   */
  score: string;
}

/**
 * Base attributes of an Alias.
 */
export interface AliasAttributes {
  /**
   * The alias address, for catchall use "@domain.tld".
   */
  address: string;
  /**
   * The destination address, comma separated.
   */
  goto: string;
  /**
   * If true: silently ignore.
   */
  goto_null?: boolean;
  /**
   * If true: learn as spam.
   */
  goto_spam?: boolean;
  /**
   * If true: learn as ham.
   */
  goto_ham?: boolean;
  /**
   * If alias is visible in sogo.
   */
  sogo_visible: boolean;
  /**
   * If alias is active or not.
   */
  active: boolean;
}

/**
 * All attributes of an Alias you can edit.
 */
export interface AliasEditAttributes extends Partial<AliasAttributes> {
  /**
   * The private comment of the alias.
   */
  private_comment?: string;
  /**
   * The public comment of the alias.
   */
  public_comment?: string;
}

/**
 * Alias post payload.
 */
export type AliasPostRequest = AliasAttributes;

/**
 * Alias update payload.
 */
export interface AliasEditRequest {
  /**
   * List of IDs of the aliases to update.
   */
  items: number | number[];
  /**
   * The attributes to set.
   */
  attr: AliasEditAttributes;
}

/**
 * Alias delete payload.
 */
export interface AliasDeleteRequest {
  /**
   * List of IDs of the aliases to delete.
   */
  items: number[];
}

/**
 * Request payload to create a time-limited (burner) alias. Mailcow always
 * generates the address itself; there is no way to request a specific one.
 */
export interface TimeLimitedAliasPostRequest {
  /**
   * The domain to generate the alias under. Must be the mailbox's own
   * domain or one of its alias domains.
   */
  domain: string;
  /**
   * The mailbox the alias should forward to. Defaults to the
   * API-authenticated mailbox when omitted.
   */
  username?: string;
  /**
   * How many hours the alias stays valid, from 1 to 87600 (10 years).
   * Defaults to 8760 (1 year). Ignored when `permanent` is true.
   */
  validity?: number;
  /**
   * If true, the alias never expires and `validity` is ignored.
   */
  permanent?: boolean;
  /**
   * Optional free-text description.
   */
  description?: string;
}

/**
 * A time-limited (burner) alias as returned by Mailcow.
 */
export interface TimeLimitedAlias {
  /**
   * The generated alias address.
   */
  address: string;
  /**
   * The mailbox this alias forwards to.
   */
  goto: string;
  /**
   * Free-text description set at creation time.
   */
  description: string;
  /**
   * Unix timestamp after which the alias expires. Meaningless when
   * `permanent` is `"1"`.
   */
  validity: number;
  /**
   * Creation timestamp.
   */
  created: string;
  /**
   * Last modified timestamp, or null if never modified.
   */
  modified: string | null;
  /**
   * String indicating whether the alias never expires ("1" for yes, "0"
   * for no).
   */
  permanent: string;
}

/**
 * Request payload to extend a time-limited alias's expiry, or mark it
 * permanent. Note: Mailcow silently no-ops if neither `validity` nor
 * `permanent` is provided.
 */
export interface TimeLimitedAliasEditRequest {
  /**
   * The address(es) to update.
   */
  address: string | string[];
  /**
   * New validity window in hours from now. Replaces the existing expiry
   * rather than adding to it. Ignored when `permanent` is true.
   */
  validity?: number;
  /**
   * If true, marks the alias as never expiring.
   */
  permanent?: boolean;
}

/**
 * Request payload to delete one or more time-limited aliases.
 */
export interface TimeLimitedAliasDeleteRequest {
  /**
   * The address(es) to delete.
   */
  address: string | string[];
}

/**
 * Interface of the Alias as returned by Mailcow.
 */
export interface Alias extends AliasAttributes {
  in_primary_domain: string;
  /**
   * The ID of the alias.
   */
  id: number;
  /**
   * The domain of the alias.
   */
  domain: string;
  /**
   * The public comment of the alias.
   */
  public_comment: string;
  /**
   * The private comment of the alias.
   */
  private_comment: string;
  /**
   * Boolean if the Alias is a catch-all.
   */
  is_catch_all: boolean;
  /**
   * Int representation of the boolean.
   */
  active_int: number;
  /**
   * Int representation of the boolean.
   */
  sogo_visible_int: number;
  /**
   * Creation date of the alias.
   */
  created: string;
  /**
   * Last modified date of the alias.
   */
  modified: string | null;
}

/**
 * All the attributes of a sync job.
 */
export interface SyncjobAttributes {
  /**
   * Your local mailcow mailbox.
   */
  username: string;
  /**
   * The smtp server where mails should be synced from.
   */
  host1: string;
  /**
   * The smtp port of the target mail server.
   */
  port1: number;
  /**
   * The password of the mailbox.
   */
  password1: string;
  /**
   * The target email account.
   */
  user1: string;
  /**
   * The encryption method used to connect to the mailserver.
   */
  enc1: 'TLS' | 'SSL' | 'PLAIN';
  /**
   * The interval in which messages should be synced.
   */
  mins_interval: number;
  /**
   * Sync into subfolder on destination (empty = do not use subfolder).
   */
  subfolder2: string;
  /**
   * Only sync messages up to this age in days.
   */
  maxage: number;
  /**
   * Max speed transfer limit for the sync.
   */
  maxbytespersecond: number;
  /**
   * Timeout for connection to remote host.
   */
  timeout1: number;
  /**
   * Timeout for connection to local host.
   */
  timeout2: number;
  /**
   * Exclude objects (regex).
   */
  exclude: string;
  /**
   * Custom parameters.
   */
  custom_params: string;
  /**
   * Delete duplicates on destination (--delete2duplicates).
   */
  delete2duplicates: boolean;
  /**
   * Delete from source when completed (--delete1).
   */
  delete1: boolean;
  /**
   * Delete messages on destination that are not on source (--delete2).
   */
  delete2: boolean;
  /**
   * Try to automap folders ("sent items", "sent" => "sent" etc.) (--automap).
   */
  automap: boolean;
  /**
   * Skip duplicate messages across folders (first come, first serve) (--skipcrossduplicates).
   */
  skipcrossduplicates: boolean;
  /**
   * Subscribe all folders (--subscribeall).
   */
  subscribeall: boolean;
  /**
   * Enables or disables the sync job.
   */
  active: boolean;
}

/**
 * Sync job creation payload.
 */
export type SyncjobPostRequest = SyncjobAttributes;

/**
 * Sync job delete payload.
 */
export interface SyncjobDeleteRequest {
  /**
   * Array of IDs to delete.
   */
  items: number[];
}

export type SyncjobEditAttributes = Partial<SyncjobAttributes>;

/**
 * Sync job update payload.
 */
export interface SyncjobUpdateRequest {
  /**
   * The attributes to set.
   */
  attr: SyncjobEditAttributes;
  /**
   * List of IDs to update.
   */
  items: number | number[];
}

/**
 * Sync job as returned by the Mailcow API.
 */
export interface Syncjob {
  /**
   * Enables or disables the sync job.
   */
  active: boolean;
  /**
   * MD5 hash of the authentication.
   */
  authmd51: boolean;
  /**
   * Authentication mechanism.
   */
  authmech1: 'TLS' | 'SSL' | 'PLAIN';
  /**
   * Try to automap folders ("sent items", "sent" => "sent" etc.) (--automap).
   */
  automap: boolean;
  /**
   * Creation date in epoch.
   */
  created: string;
  /**
   * Custom parameters.
   */
  custom_params: string;
  /**
   * Delete from source when completed (--delete1).
   */
  delete1: boolean;
  /**
   * Delete messages on destination that are not on source (--delete2).
   */
  delete2: boolean;
  /**
   * Delete duplicates on destination (--delete2duplicates).
   */
  delete2duplicates: boolean;
  /**
   * Target domain.
   */
  domain2: string;
  /**
   * The encryption method used to connect to the mailserver.
   */
  enc1: 'TLS' | 'SSL' | 'PLAIN';
  /**
   * Exclude objects (regex).
   */
  exclude: string;
  /**
   * The smtp server where mails should be synced from.
   */
  host1: string;
  /**
   * ID of the sync job.
   */
  id: number;
  /**
   * If the sync job is currently running.
   */
  is_running: boolean;
  /**
   * Date of the last run.
   */
  last_run: string;
  /**
   * Logfile
   */
  log: string;
  /**
   * Only sync messages up to this age in days.
   */
  maxage: number;
  /**
   * Max speed transfer limit for the sync.
   */
  maxbytespersecond: number;
  /**
   * The interval in which messages should be synced.
   */
  mins_interval: number;
  /**
   * Last modified date of the sync job..
   */
  modified: string | null;
  /**
   * Port of the source server.
   */
  port1: number;
  /**
   * Regex.
   */
  regextrans2: string;
  /**
   * If cross duplicates should be skipped.
   */
  skipcrossduplicates: boolean;
  /**
   * Subfolder on target server.
   */
  subfolder2: string;
  /**
   * If the sync job is subscribed to all mailboxes.
   */
  subscribeall: boolean;
  /**
   * Timeout for connection to remote host.
   */
  timeout1: number;
  /**
   * Timeout for connection to local host.
   */
  timeout2: number;
  /**
   * User on the remote host.
   */
  user1: string;
  /**
   * User on the local host.
   */
  user2: string;
}

/**
 * Forwarding host creation payload.
 */
export interface ForwardingCreateRequest {
  /**
   * True to enable spam filter, false to disable spam filter.
   */
  filter_spam: boolean;

  /**
   * Contains the hostname you want to add.
   */
  hostname: string;
}

/**
 * Forwarding host deletion payload.
 */
export interface ForwardingDeleteRequest {
  /**
   * IPs of the forwarding hosts to delete.
   */
  items: string[];
}

/**
 * Forwarding host as returned by the Mailcow API.
 */
export interface ForwardingHost {
  /**
   * IP of the forwarding host.
   */
  host: string;
  /**
   * If the host keeps or discards spam.
   */
  keep_spam: 'yes' | 'no';
  /**
   * Hostname.
   */
  source: string;
}

/**
 * Base Log interface
 */
export interface Log {
  /**
   * Timestamp in Epoch format.
   */
  time: number;
}

export interface ACMELog extends Log {
  /**
   * Log message.
   */
  message: string;
}

/**
 * API Log item.
 */
export interface APILog extends Log {
  /**
   * Payload used in the API call.
   */
  data: string;
  /**
   * Request method.
   */
  method: 'GET' | 'POST';
  /**
   * IP that did the call.
   */
  remote: string;
  /**
   * API Route used.
   */
  uri: string;
}

/**
 * Autodiscover log item.
 */
export interface ADLog extends Log {
  /**
   * Service used.
   */
  service: string;
  /**
   * User agent.
   */
  ua: string;
  /**
   * The user.
   */
  user: string;
}

/**
 * Dovecot log item.
 */
export interface DCLog extends Log {
  /**
   * The dovecot log message.
   */
  message: string;
  /**
   * The dovecot priority level.
   */
  priority: string;
  /**
   * Program used.
   */
  program: string;
}

/**
 * Netfilter log item.
 */
export interface NFLog extends Log {
  /**
   * The netfilter message.
   */
  message: string;
  /**
   * The netfilter priority level.
   */
  priority: string;
}

/**
 * Postfix log item.
 */
export interface PFLog extends Log {
  /**
   * The Postfix log message.
   */
  message: string;
  /**
   * The Postfix priority level.
   */
  priority: string;
  /**
   * Program used.
   */
  program: string;
}

/**
 * Ratelimited log item.
 */
export interface RLLog extends Log {
  /**
   * From email address.
   */
  from: string;
  /**
   * Header of the from field.
   */
  header_from: string;
  /**
   * Header of the subject field.
   */
  header_subject: string;
  /**
   * IP of the sender.
   */
  ip: string;
  /**
   * ID of the message.
   */
  message_id: string;
  /**
   * QID of the message.
   */
  qid: string;
  /**
   * Recipient of the message.
   */
  rcpt: string;
  /**
   * Ratelimit hash.
   */
  rl_hash: string;
  /**
   * Ratelimit info
   */
  rl_info: string;
  /**
   * Ratelimit name
   */
  rl_name: string;
  /**
   * Sender of the message.
   */
  user: string;
}

/**
 * Rspamd log item.
 */
export interface RSLog extends Log {
  /**
   * What happend to the message.
   */
  action: string;
  /**
   * Size of the message.
   */
  size: string;
  /**
   * Array of recipients SMTPs.
   */
  rcpt_smtp: string[];
  /**
   * Array of recipients MIME.
   */
  rcpt_mime: string[];
  /**
   * Object containing all the Rspamd scoring info.
   */
  symbols: object;
  /**
   * Score needed to pass.
   */
  required_score: string;
  /**
   * Message ID
   */
  'message-id': string;
  /**
   * IP of the sender
   */
  ip: string;
  /**
   * Name of the user
   */
  user: string;
  /**
   * Time used.
   */
  time_real: string;
  /**
   * SMTP of the receiver.
   */
  sender_smtp: string;
  /**
   * If the message was skipped.
   */
  is_skipped: boolean;
  /**
   * Score of the message
   */
  score: number;
  /**
   * MIME of the sender.
   */
  sender_mime: string;
  /**
   * EPOCH time stamp.
   */
  unix_time: number;
  /**
   * Subject of the e-mail.
   */
  subject: string;
}

/**
 * SOGo log item.
 */
export interface SGLog extends Log {
  /**
   * The log message.
   */
  message: string;
  /**
   * The priority level.
   */
  priority: string;

  program: 'sogod';
}

/**
 * Watchdog log item.
 */
export interface WDLog extends Log {
  /**
   * Difference with previous health.
   */
  hpdiff: number;
  /**
   * Current health
   */
  hpnow: number;
  /**
   * Total health.
   */
  hptotal: number;
  /**
   * Level of the service
   */
  lvl: number;
  /**
   * Service being watched
   */
  service: string;
  /**
   * Time of report in Epoch.
   */
  time: number;
}

/**
 * Type of Bcc map.
 */
export type BccMapType = 'sender' | 'recipient';

/**
 * Bcc map base item.
 */
export interface BaseBccMap {
  /**
   * Enables or disables the bcc map.
   */
  active: number;
  /**
   * Email address where all mails should be send to.
   */
  bcc_dest: string;
  /**
   * Email addres which emails should be forwarded.
   */
  local_dest: string;
  /**
   * Type of the bcc map.
   */
  type: BccMapType;
}

/** Bcc map creation request */
export type AddBccMapRequest = BaseBccMap;

/**
 * Recipient map base item.
 */
export interface BaseRecipientMap {
  /**
   * Enables or disables the recipient map.
   */
  active: number;
  /**
   * Email address that should receive the forwarded emails.
   */
  recipient_map_new: string;
  /**
   * Email address which emails should be forwarded.
   */
  recipient_map_old: string;
}

/** Recipient map creation request. */
export type AddRecipientMapRequest = BaseRecipientMap;

/**
 * Bcc map deletion request.
 */
export interface BccMapDeletionRequest {
  /**
   * List of IDs of the bcc maps to delete.
   */
  items: number[];
}

/**
 * Recipient map deletion request.
 */
export interface RecipientMapDeletionRequest {
  /**
   * List of IDs of the recipient maps to delete.
   */
  items: number[];
}

/**
 * Bcc map item.
 */
export interface BccMap extends BaseBccMap {
  /**
   * Creation date in epoch.
   */
  created: string;
  /**
   * Domain of the local desitination.
   */
  domain: string;
  /**
   * Id of the bcc map.
   */
  id: number;
  /**
   * Last modified data in epoch.
   */
  modified?: string | null;
}

export type GetBccMapResponse = BccMap[];

/**
 * Recipient map item.
 */
export interface RecipientMap extends BaseRecipientMap {
  /**
   * Creation date in epoch.
   */
  created: string;
  /**
   * Id of the bcc map.
   */
  id: number;
  /**
   * Last modified data in epoch.
   */
  modified?: string | null;
}

export type GetRecipientMapResponse = RecipientMap[];

/**
 * Error class used for exception handling.
 */
export class MailcowException extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'MailcowException';
  }
}

/**
 * Fail2Ban edit request.
 */
export interface Fail2BanEditRequest {
  /**
   * Configuration attributes to apply.
   */
  attr: {
    /**
     * Duration (in seconds) a ban should last.
     */
    ban_time: string;
    /**
     * Whether to increment ban time on repeated offenses.
     */
    ban_time_increment: string;
    /**
     * List of blacklisted IPs or CIDRs, comma separated.
     */
    blacklist: string;
    /**
     * Maximum number of failed attempts before banning.
     */
    max_attempts: string;
    /**
     * Maximum duration (in seconds) for a ban.
     */
    max_ban_time: string;
    /**
     * Netban range for IPv4.
     */
    netban_ipv4: string;
    /**
     * Netban range for IPv6.
     */
    netban_ipv6: string;
    /**
     * Time window (in seconds) for retry count.
     */
    retry_window: string;
    /**
     * List of whitelisted IPs or domains, comma separated.
     */
    whitelist: string;
  };
  /**
   * Affected networks (use "all" for global update).
   */
  items: string;
}

/**
 * Fail2Ban configuration response.
 */
export interface Fail2Ban {
  /**
   * Duration (in seconds) a ban should last.
   */
  ban_time: number;
  /**
   * Whether to increment ban time on repeated offenses.
   */
  ban_time_increment: number;
  /**
   * List of blacklisted IPs or CIDRs, newline-separated.
   */
  blacklist: string;
  /**
   * Maximum number of failed attempts before banning.
   */
  max_attempts: number;
  /**
   * Maximum duration (in seconds) for a ban.
   */
  max_ban_time: number;
  /**
   * Netban range for IPv4.
   */
  netban_ipv4: number;
  /**
   * Netban range for IPv6.
   */
  netban_ipv6: number;
  /**
   * List of permanently banned IPs.
   */
  perm_bans: string[];
  /**
   * Time window (in seconds) for retry count.
   */
  retry_window: number;
  /**
   * List of whitelisted IPs or domains, comma or newline-separated.
   */
  whitelist: string;
}

export type Fail2BanResponse = Fail2Ban;

/**
 * Container state as reported by Mailcow.
 */
export type ContainerState = 'running' | 'stopped' | 'exited';

/**
 * Classification type for container information.
 */
export type ContainerType = 'info' | 'error' | 'warning';

/**
 * Status information for a single Mailcow container.
 */
export type ContainerStatus = {
  /**
   * Name of the Docker container.
   */
  container: string;
  /**
   * Docker image used by the container.
   */
  image: string;
  /**
   * ISO 8601 timestamp of when the container was started.
   */
  started_at: string;
  /**
   * Current state of the container.
   */
  state: ContainerState;
  /**
   * Type of message or classification.
   */
  type: ContainerType;
};

/**
 * Mapping of container names to their status objects.
 */
export type StatusContainers = Record<string, ContainerStatus>;

/**
 * Status of the vmail volume and usage statistics.
 */
export type StatusVmail = {
  /**
   * Disk device used for vmail.
   */
  disk: string;
  /**
   * Total disk size.
   */
  total: string;
  /**
   * Used disk space.
   */
  used: string;
  /**
   * Percentage of used disk space.
   */
  used_percent: string;
  /**
   * Classification type for the vmail status.
   */
  type: ContainerType;
};

/**
 * Current running Mailcow version.
 */
export type StatusVersion = {
  /**
   * Release version string.
   */
  version: string;
};

/**
 * Resource object as returned by Mailcow.
 */
export type Resource = {
  /**
   * Whether the resource is active ("1") or not ("0").
   */
  active: number | '1' | '0';
  /**
   * Description of the resource.
   */
  description: string;
  /**
   * Domain of the resource.
   */
  domain: string;
  /**
   * Type of resource (e.g., "location").
   */
  kind: string;
  /**
   * Local part of the resource email (before @).
   */
  local_part: string;
  /**
   * Whether multiple bookings are allowed (0 or 1).
   */
  multiple_bookings: number;
  /**
   * Full email address of the resource.
   */
  name: string;
};

/**
 * Resource create request.
 */
export type CreateResourceRequest = Resource;

/**
 * Resource delete request
 */
export interface DeleteResourceRequest {
  /**
   * List of resource names to delete.
   * see {@link Resource.name}
   */
  names: string[];
}

/**
 * Queue item representation for mail in the queue.
 */
export interface QueueItem {
  /**
   * Arrival time of mail in epoch.
   */
  arrival_time: number;
  /**
   * Size of the message in bytes.
   */
  message_size: number;
  /**
   * The queue id.
   */
  queue_id: string;
  /**
   * The queue item queue name.
   */
  queue_name: string;
  /**
   * The recipients of the mail.
   */
  recipients: string[];
  /**
   * The sender of the mail.
   */
  sender: string;
}

/**
 * Represents a single quarantined email item returned by the Mailcow API.
 */
export interface QuarantineItem {
  /**
   * Timestamp when the email was quarantined.
   */
  created: number;

  /**
   * Unique identifier of the quarantined email item.
   */
  id: number;

  /**
   * Indicates whether a notification has been sent.
   * 1 for yes, 0 for no.
   */
  notified: number;

  /**
   * Queue ID of the email.
   */
  qid: string;

  /**
   * Recipient email address.
   */
  rcpt: string;

  /**
   * Spam score of the email.
   */
  score: number;

  /**
   * Sender email address.
   */
  sender: string;

  /**
   * Subject of the quarantined email.
   */
  subject: string;

  /**
   * Flag indicating presence of a virus.
   * 1 for yes, 0 for no.
   */
  virus_flag: number;
}

export interface DeleteQuarantineRequest {
  /**
   * An array of email IDs to delete from quarantine.
   */
  items: number[];
}

/**
 * Action to take on a quarantined email via `edit/qitem`.
 *
 * - `release` -- deliver the email to the original recipient's inbox.
 * - `learnham` -- mark the email as ham and feed it back to Rspamd as
 *   a training sample. Useful for false positives.
 *
 * The quarantine queue is already presumed-spam by definition, so there
 * is no `learnspam` counterpart -- Mailcow does not document one.
 */
export type QuarantineItemAction = 'release' | 'learnham';

/**
 * Request payload for `edit/qitem`.
 *
 * The `items` array holds the IDs of the quarantined messages to act
 * on; the same `attr.action` is applied to every entry.
 */
export interface EditQuarantineItemRequest {
  /**
   * IDs of the quarantined messages to act on. Get them from
   * `mcc.quarantine.get()`.
   */
  items: number[];
  attr: {
    action: QuarantineItemAction;
  };
}

/**
 * Request payload to edit rate limits for specified domains.
 */
export interface EditDomainRequest {
  attr: {
    /**
     * Frame for the rate limit (e.g., 'h', 's', 'm').
     */
    rl_frame: string;

    /**
     * Rate limit value.
     */
    rl_value: number;
  };

  /**
   * List of domain names to edit rate limits for.
   */
  items: string[];
}

/**
 * Request payload to edit rate limits for specified mailboxes.
 */
export interface EditMailboxRequest {
  attr: {
    /**
     * Frame for the rate limit (e.g., 'h', 's', 'm').
     */
    rl_frame: string;

    /**
     * Rate limit value.
     */
    rl_value: number;
  };

  /**
   * List of mailbox names to edit rate limits for.
   */
  items: string[];
}

/**
 * Represents the rate limit settings for a domain.
 */
export interface DomainRatelimit {
  /**
   * Rate limit frame, e.g., 's', 'm', 'h'.
   */
  frame: string;

  /**
   * The domain associated with this rate limit.
   */
  domain: string;

  /**
   * The rate limit value.
   */
  value: string;
}

/**
 * Represents the rate limit settings for a mailbox.
 */
export interface MailboxRatelimit {
  /**
   * Rate limit frame, e.g., 's', 'm', 'h'.
   */
  frame: string;

  /**
   * The mailbox associated with this rate limit.
   */
  mailbox: string;

  /**
   * The rate limit value.
   */
  value: string;
}

/**
 * Request payload to add a new OAuth client.
 */
export interface AddOAuthClientRequest {
  /**
   * The URI where you should be redirected after OAuth authentication.
   */
  redirect_uri: string;
}

/**
 * Request payload to delete one or more OAuth clients.
 */
export interface DeleteOAuthClientRequest {
  /**
   * List of OAuth client IDs you want to delete.
   */
  items: string[];
}

/**
 * Request payload to get an OAuth client or all clients.
 */
export interface GetOAuthClientRequest {
  /**
   * The OAuth client ID or 'all' to retrieve all clients.
   */
  id: string;
}

/**
 * Represents an OAuth client returned by the Mailcow API.
 */
export interface OAuthClient {
  /**
   * Unique identifier for the OAuth client.
   */
  client_id: string;

  /**
   * Secret key for the OAuth client.
   */
  client_secret: string;

  /**
   * Grant types associated with the OAuth client.
   */
  grant_types: string | null;

  /**
   * ID of the OAuth entry.
   */
  id: number;

  /**
   * Redirect URI for the OAuth client.
   */
  redirect_uri: string;

  /**
   * Scope for the OAuth client.
   */
  scope: string;

  /**
   * User ID associated with the OAuth client.
   */
  user_id: string | null;
}

/**
 * Request payload to add a new app password.
 */
export interface AddAppPasswordRequest {
  /**
   * Indicates if the app password is active.
   */
  active: boolean;

  /**
   * Mailbox for which the app password should be created.
   */
  username: string;

  /**
   * Name of your app password.
   */
  app_name: string;

  /**
   * Your app password.
   */
  app_passwd: string;

  /**
   * Confirmation of your app password.
   */
  app_passwd2: string;

  /**
   * List of protocols this app password has access to.
   */
  protocols: string[];
}

/**
 * Request payload to delete one or more app passwords.
 */
export interface DeleteAppPasswordRequest {
  /**
   * List of app password IDs you want to delete.
   */
  items: string[];
}

/**
 * Represents an app password returned by the Mailcow API.
 */
export interface AppPassword {
  /**
   * String indicating if the app password is active ("1" for yes, "0" for no).
   */
  active: string;

  /**
   * Creation timestamp of the app password.
   */
  created: string;

  /**
   * Domain associated with the app password.
   */
  domain: string;

  /**
   * Unique identifier of the app password.
   */
  id: number;

  /**
   * Mailbox associated with the app password.
   */
  mailbox: string;

  /**
   * Last modified timestamp, or null if it was never modified.
   */
  modified: string | null;

  /**
   * Name of the app associated with this password.
   */
  name: string;
}

/**
 * Request payload to add a new TLS Policy Map.
 */
export interface AddTlsPolicyMapRequest {
  /**
   * Custom parameters for the TLS policy.
   * Consult [Postfix documentation](http://www.postfix.org/postconf.5.html#smtp_tls_policy_maps) for more info.
   */
  parameters: string;

  /**
   * Indicates if the TLS policy map entry is active (1 for active, 0 for disabled).
   */
  active: number;

  /**
   * The target domain or email address for the TLS policy.
   */
  dest: string;

  /**
   * The policy applied to the target domain or email.
   * Possible values: 'none', 'may', 'encrypt', 'dane', "'dane", 'fingerprint', 'verify', 'secure'.
   */
  policy: string;
}

/**
 * Request payload to delete one or more TLS Policy Maps.
 */
export interface DeleteTlsPolicyMapRequest {
  /**
   * List of TLS policy map IDs you want to delete.
   */
  items: string[];
}

/**
 * Represents a TLS Policy Map entry returned by the Mailcow API.
 */
export interface TlsPolicyMap {
  /**
   * Custom parameters for the TLS policy.
   */
  parameters: string;

  /**
   * Indicates if the TLS policy map entry is active ("1" for yes, "0" for no).
   */
  active: string;

  /**
   * Creation timestamp of the TLS policy map entry.
   */
  created: string;

  /**
   * The target domain or email address for the TLS policy.
   */
  dest: string;

  /**
   * Unique identifier of the TLS policy map entry.
   */
  id: number;

  /**
   * Last modified timestamp, or null if never modified.
   */
  modified: string | null;

  /**
   * The policy applied to the target domain or email.
   */
  policy: string;
}

/**
 * Request payload to generate new DKIM keys.
 */
export interface CreateDkimRequest {
  /**
   * The DKIM selector, typically 'dkim'.
   */
  dkim_selector: string;

  /**
   * The domains for which DKIM keys should be generated.
   */
  domains: string;

  /**
   * Key size for the DKIM key (1024, 2048, 3072, or 4096).
   */
  key_size: number;
}

/**
 * Request payload to duplicate a DKIM key from one domain to another.
 */
export interface DuplicateDkimRequest {
  /**
   * The domain from which the DKIM key should be copied.
   */
  from_domain: string;

  /**
   * The domain to which the DKIM key should be copied.
   */
  to_domain: string;
}

/**
 * Request payload to delete DKIM keys for specified domains.
 */
export interface DeleteDkimRequest {
  /**
   * List of domains for which DKIM keys should be deleted.
   */
  items: string[];
}

/**
 * Represents a DKIM entry returned by the Mailcow API.
 */
export interface DkimEntry {
  /**
   * The DKIM selector used.
   */
  dkim_selector: string;

  /**
   * The DKIM TXT record value.
   */
  dkim_txt: string;

  /**
   * The length of the DKIM key.
   */
  length: string;

  /**
   * The private key associated with the DKIM entry.
   */
  privkey: string;

  /**
   * The public key associated with the DKIM entry.
   */
  pubkey: string;
}

/**
 * Request payload to create a new Domain Admin.
 */
export interface CreateDomainAdminRequest {
  /**
   * Indicates if the domain admin account is active (1 for active, 0 for disabled).
   */
  active: number;

  /**
   * The domains that the user will have admin control over.
   */
  domains: string;

  /**
   * The password for the domain admin user.
   */
  password: string;

  /**
   * Confirmation for the domain admin user password.
   */
  password2: string;

  /**
   * The username for the admin user.
   */
  username: string;
}

/**
 * Request payload to issue a Domain Admin SSO token.
 */
export interface IssueDomainAdminSsoTokenRequest {
  /**
   * The username of the domain admin user.
   */
  username: string;
}

/**
 * Request payload to edit an existing Domain Admin user.
 */
export interface EditDomainAdminRequest {
  /**
   * Contains the username of the domain admin you want to edit.
   */
  items: string[];

  /**
   * Attributes to update for the domain admin user.
   */
  attr: {
    /**
     * Is the domain admin active or not.
     */
    active: ('1' | '0')[];

    /**
     * New username for the domain admin, if changing.
     */
    username_new: string;

    /**
     * List of domains managed by this domain admin.
     */
    domains: string[];

    /**
     * New password for the domain admin user.
     */
    password: string;

    /**
     * New password confirmation for the domain admin user.
     */
    password2: string;
  };
}

/**
 * Request payload to delete one or more Domain Admin users.
 */
export interface DeleteDomainAdminRequest {
  /**
   * List of usernames of the domain admin users you want to delete.
   */
  items: string[];
}

/**
 * Represents a Domain Admin entry returned by the Mailcow API.
 */
export interface DomainAdmin {
  /**
   * String indicating if the domain admin is active ("1" for yes, "0" for no).
   */
  active: string;

  /**
   * Creation timestamp of the domain admin entry.
   */
  created: string;

  /**
   * List of domains selected for this domain admin.
   */
  selected_domains: string[];

  /**
   * Indicates if two-factor authentication is active ("1" for yes, "0" for no).
   */
  tfa_active: string;

  /**
   * List of domains not selected for this domain admin.
   */
  unselected_domains: string[];

  /**
   * Username of the domain admin.
   */
  username: string;
}

/**
 * Request payload to create a Sender-Dependent Transport (Relayhost).
 */
export interface CreateRelayhostRequest {
  /**
   * The hostname of the SMTP server, including port.
   */
  hostname: string;

  /**
   * The password for the SMTP user.
   */
  password: string;

  /**
   * The username used to authenticate with the SMTP server.
   */
  username: string;
}

/**
 * Request payload to create a Transport Map.
 */
export interface CreateTransportMapRequest {
  /**
   * Indicates if the transport map is active (1 for active, 0 for disabled).
   */
  active: number;

  /**
   * The destination domain for the transport map.
   */
  destination: string;

  /**
   * The next hop for the transport map.
   */
  nexthop: string;

  /**
   * The password for the SMTP user.
   */
  password: string;

  /**
   * The username used to authenticate with the SMTP server.
   */
  username: string;
}

/**
 * Request payload to delete Sender-Dependent Transports or Transport Maps.
 */
export interface DeleteRoutingRequest {
  /**
   * List of IDs for the entries to delete.
   */
  items: string[];
}

/**
 * Represents a Relayhost entry returned by the Mailcow API.
 */
export interface Relayhost {
  /**
   * Indicates if the relayhost is active.
   */
  active: string;

  /**
   * The hostname of the SMTP server, including port.
   */
  hostname: string;

  /**
   * Unique identifier of the relayhost entry.
   */
  id: number;

  /**
   * The SMTP user password.
   */
  password: string;

  /**
   * Shortened version of the password for display.
   */
  password_short: string;

  /**
   * Domains using this relayhost.
   */
  used_by_domains: string;

  /**
   * The username used to authenticate with the SMTP server.
   */
  username: string;
}

/**
 * Represents a Transport Map entry returned by the Mailcow API.
 */
export interface TransportMap {
  /**
   * Indicates if the transport map is active.
   */
  active: string;

  /**
   * The destination domain for the transport map.
   */
  destination: string;

  /**
   * Unique identifier of the transport map entry.
   */
  id: number;

  /**
   * MX lookup status.
   */
  lookup_mx: string;

  /**
   * The next hop for the transport map.
   */
  nexthop: string;

  /**
   * The SMTP user password.
   */
  password: string;

  /**
   * Shortened version of the password for display.
   */
  password_short: string;

  /**
   * The username used to authenticate with the SMTP server.
   */
  username: string;
}

/**
 * Identity Provider authentication source.
 *
 * Mailcow's external authentication backends. `mailcow` (the built-in
 * local password database) is not configurable via this endpoint and is
 * therefore not part of this union.
 */
export type IdentityProviderAuthsource = 'ldap' | 'keycloak' | 'generic-oidc';

/**
 * Attributes shared across every identity-provider configuration,
 * regardless of which auth source it targets.
 */
export interface BaseIdentityProviderAttributes {
  /**
   * If no matching attribute mapping exists for a user, the default template
   * is used when creating the mailbox (not on update). Mailcow expects the
   * template name as configured under "Mailbox templates".
   */
  default_template?: string;
  /**
   * Attribute values used to match a mailbox template. Each element pairs
   * positionally with `templates` -- the n-th `mappers` entry selects the
   * n-th `templates` entry.
   */
  mappers?: string[];
  /**
   * Mailbox template names. See `mappers` for how the two arrays are
   * correlated.
   */
  templates?: string[];
  /**
   * Skip TLS certificate validation when contacting the auth source.
   * @defaultValue false
   */
  ignore_ssl_error?: boolean;
  /**
   * Whether Mailcow should periodically pull every user from the auth
   * source. Defaults to `false`; combine with `sync_interval` and
   * `import_users` to enable scheduled syncs.
   * @defaultValue false
   */
  periodic_sync?: boolean;
  /**
   * Whether new users discovered during a sync should be imported into
   * Mailcow as mailboxes.
   * @defaultValue false
   */
  import_users?: boolean;
  /**
   * Interval, in minutes, between periodic syncs.
   * @defaultValue 15
   */
  sync_interval?: number;
}

/**
 * Identity provider attributes for an external Keycloak server.
 */
export interface KeycloakIdentityProviderAttributes extends BaseIdentityProviderAttributes {
  authsource: 'keycloak';
  /**
   * Base URL of the Keycloak server (no trailing slash needed).
   */
  server_url: string;
  /**
   * Keycloak realm where the Mailcow client is configured.
   */
  realm: string;
  /**
   * Client ID of the Mailcow OIDC client inside the realm.
   */
  client_id: string;
  /**
   * Client secret paired with `client_id`. Sent back from Mailcow as
   * `"*"` once configured.
   */
  client_secret: string;
  /**
   * Primary redirect URL configured for the Mailcow client in Keycloak.
   */
  redirect_url: string;
  /**
   * Additional accepted redirect URLs.
   */
  redirect_url_extra?: string[];
  /**
   * Keycloak version (for example `26.1.3`). Mailcow uses this to pick
   * the right admin API shape internally.
   */
  version: string;
  /**
   * Validate user passwords via the Keycloak admin REST API instead of
   * relying only on the Authorization Code Flow. Required for IMAP/SMTP
   * to keep working when Keycloak is the source of truth for passwords.
   * @defaultValue false
   */
  mailpassword_flow?: boolean;
}

/**
 * Identity provider attributes for an external LDAP / Active Directory
 * server.
 */
export interface LdapIdentityProviderAttributes extends BaseIdentityProviderAttributes {
  authsource: 'ldap';
  /**
   * Hostname (or comma-separated list of hostnames for fallback) of the
   * LDAP server.
   */
  host: string;
  /**
   * LDAP port as a string.
   */
  port: string;
  /**
   * Use LDAPS. If `port` is 389 it is forced to 636.
   * @defaultValue false
   */
  use_ssl?: boolean;
  /**
   * Use StartTLS. Mutually exclusive with `use_ssl`; preferred over SSL.
   * @defaultValue false
   */
  use_tls?: boolean;
  /**
   * Base DN under which user searches are performed.
   */
  basedn: string;
  /**
   * LDAP attribute used to identify users at login.
   * @defaultValue 'mail'
   */
  username_field?: string;
  /**
   * Optional LDAP search filter to limit who may authenticate.
   */
  filter?: string;
  /**
   * LDAP attribute whose value Mailcow maps to a mailbox template via
   * `mappers` / `templates`.
   */
  attribute_field: string;
  /**
   * Bind DN used to perform user searches.
   */
  binddn: string;
  /**
   * Password for `binddn`.
   */
  bindpass: string;
}

/**
 * Identity provider attributes for an arbitrary OIDC provider that is
 * not Keycloak (Authentik, Auth0, Okta, ...).
 */
export interface GenericOidcIdentityProviderAttributes extends BaseIdentityProviderAttributes {
  authsource: 'generic-oidc';
  /**
   * Authorization endpoint URL.
   */
  authorize_url: string;
  /**
   * Token endpoint URL.
   */
  token_url: string;
  /**
   * Userinfo endpoint URL.
   */
  userinfo_url: string;
  /**
   * Client ID issued by the OIDC provider.
   */
  client_id: string;
  /**
   * Client secret issued by the OIDC provider.
   */
  client_secret: string;
  /**
   * Primary redirect URL registered with the provider.
   */
  redirect_url: string;
  /**
   * Additional accepted redirect URLs.
   */
  redirect_url_extra?: string[];
  /**
   * Space-separated list of OIDC scopes requested at login.
   * @defaultValue 'openid profile email mailcow_template'
   */
  client_scopes?: string;
}

/**
 * Discriminated union of every supported identity-provider
 * configuration. The `authsource` field is the discriminant.
 */
export type IdentityProviderAttributes =
  KeycloakIdentityProviderAttributes | LdapIdentityProviderAttributes | GenericOidcIdentityProviderAttributes;

/**
 * Wire-level body of the `edit/identity-provider` request. The wrapper
 * builds this for you from {@link IdentityProviderAttributes}, but it
 * is exported in case callers need to construct it manually.
 *
 * `items` is always `['identity-provider']` -- the array type is used
 * (rather than a fixed tuple) so callers do not have to use a `const`
 * assertion to satisfy this interface.
 */
export interface IdentityProviderEditRequest {
  attr: IdentityProviderAttributes;
  items: 'identity-provider'[];
}

/**
 * Interface for a general Mailcow API response.
 *
 * This is used when the API call doesn't return any objects, i.e. POST requests.
 */
export interface BaseResponse {
  log?: (string | Record<string, unknown>)[];
  msg: string[] | string;
  type: 'succes' | 'danger' | 'error';
}

/**
 * Mailcow API calls returns an array of Base Responses.
 */
export type MailcowResponse = BaseResponse[];

/**
 * Interface for when the API called returned an Error.
 */
export interface MailcowErrorResponse extends MailcowResponse {
  msg: string;
}
