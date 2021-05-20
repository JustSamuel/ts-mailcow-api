/* eslint-disable camelcase */
/**
 * Payloads should be JSONs.
 */
export type Payload = Record<string, any> | null;

/**
 * Base attributes of a domain.
 */
export interface BaseDomainAttributes {
  /**
   * The language code associated with this domain.
   */
  lang: "sk" | "cs" | "de" | "en" | "es" | "fr" | "lv" | "nl" | "pl" | "pt" | "ru" | "it" | "ca"
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
};

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
  gal: boolean
  /**
   * Id of the relayhost.
   */
  relayhost: number
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
   * If the domain should only relay unknown adresses.
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
   * Boolean if the mailbox is active.
   */
  active: boolean;
  /**
   * Boolean if the user is forced to update their password on login.
   */
  force_pw_update: boolean;
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
};

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
};

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
  percent_class: "success" | "warning" | "danger";
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
 * Quarantaine notification edit payload.
 */
export interface QuarantaineEditRequest {
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
 * Base attributes of an Alias.
 */
export interface AliasAttributes {
  /**
   * The alias address, for catchall use "@domain.tld".
   */
  address: string
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
};

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
 * Interface of the Alias as returned by Mailcow.
 */
export interface Alias extends AliasAttributes {
  in_primary_domain: string,
  /**
   * The ID of the alias.
   */
  id: number,
  /**
   * The domain of the alias.
   */
  domain: string,
  /**
   * The public comment of the alias.
   */
  public_comment: string,
  /**
   * The private comment of the alias.
   */
  private_comment: string,
  /**
   * Boolean if the Alias is a catch-all.
   */
  is_catch_all: boolean,
  /**
   * Int representation of the boolean.
   */
  active_int: number,
  /**
   * Int representation of the boolean.
   */
  sogo_visible_int: number,
  /**
   * Creation date of the alias.
   */
  created: string,
  /**
   * Last modified date of the alias.
   */
  modified: string | null
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
  user1: string,
  /**
   * The encryption method used to connect to the mailserver.
   */
  enc1: "TLS" | "SSL" | "PLAIN";
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
export type SyncjobPostRequest = SyncjobAttributes

/**
 * Sync job delete payload.
 */
export interface SyncjobDeleteRequest {
  /**
   * Array of IDs to delete.
   */
  items: number[]
}

export type SyncjobEditAttributes = Partial<SyncjobAttributes>

/**
 * Sync job update payload.
 */
export interface SyncjobUpdateRequest {
  /**
   * The attributes to set.
   */
  attr: SyncjobEditAttributes
  /**
   * List of IDs to update.
   */
  items: number | number[]
}

/**
 * Sync job as returned by the Mailcow API.
 */
export interface Syncjob {
  active: boolean,
  authmd51: boolean,
  authmech1: "TLS" | "SSL" | "PLAIN",
  automap: boolean,
  created: string,
  custom_params: string,
  delete1: boolean,
  delete2: boolean,
  delete2duplicates: boolean,
  domain2: string,
  enc1: "TLS" | "SSL" | "PLAIN",
  exclude: string,
  host1: string,
  id: number,
  is_running: boolean,
  last_run: string,
  log: string,
  maxage: number,
  maxbytespersecond: number,
  mins_interval: number,
  modified: string,
  port1: number,
  regextrans2: string,
  skipcrossduplicates: boolean,
  subfolder2: string,
  subscribeall: boolean
  timeout1: number,
  timeout2: number,
  user1: string,
  user2: string
}

/**
 * Error class used for exception handling.
 */
export class MailcowException extends Error {
  /**
   * The error message provided by Mailcow.
   */
  message: string;
}

/**
 * Interface for a general Mailcow API response.
 *
 * This is used when the API call doesn't return any objects, i.e. POST requests.
 */
export interface BaseResponse {
  log?: (string | Payload)[];
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
