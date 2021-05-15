export type Payload = Record<string, any > | null

export type BaseDomainAttributes = {
    active: boolean,
    aliases: number,
    backupmx: number,
    defquota: number,
    description: string,
    gal: boolean,
    mailboxes: number,
    maxquota: number,
    quota: number,
    relay_all_recipients: boolean,
}

type RelayFrame = "s" | "m" | "h" | "d"

export type DomainPostRequest = BaseDomainAttributes & {
    domain: string,
    rl_frame: RelayFrame,
    rl_value: number,
    restart_sogo: boolean,
}

export interface DomainDeleteRequest  {
    domains: string[]
}

export type DomainEditAttributes = BaseDomainAttributes & {relayhost: number}

export interface DomainEditRequest {
    attr: Partial<DomainEditAttributes>
    items: string | string[],
}

export interface DomainResponse {
    active: number,
    aliases_in_domain: number,
    aliases_left: number,
    backupmx: boolean,
    bytes_total: number,
    def_new_mailbox_quota: number,
    def_quota_for_mbox: number,
    description: string,
    domain_name: string,
    gal: boolean,
    max_new_mailbox_quota: string,
    max_num_aliases_for_domain: number,
    max_num_mboxes_for_domain: number,
    max_quota_for_domain: number,
    max_quota_for_mbox: number,
    mboxes_in_domain: number,
    mboxes_left: number,
    msgs_total: number,
    quota_used_in_domain: number,
    relay_all_recipients: boolean,
    relayhost: boolean,
    rl: boolean | { value: string, frame: string }
    xmpp: boolean,
    xmpp_prefix: string,
    gal_int: boolean,
    active_int: boolean,
    relay_all_recipients_int: boolean,
    relay_unknown_only: boolean,
    relay_unknown_only_int: boolean,
    domain_admins: string[]
}

export interface SpamPolicyPostRequest {
    domain: string,
    object_from: string,
    object_list: "wl" | "bl",
}

export interface SpamPolicyDeleteRequest {
    prefid: number[],
}

export interface SpamPolicyGetRequest {
    type: "wl" | "bl",
    domain: string,
}

export interface SpamPolicyResponse {
    object: string,
    value: string,
    prefid: number,
}

export type BaseMailboxAttributes = {
    active: boolean,
    force_pw_update: boolean,
    name: string,
    password: string,
    password2: string
    quota: number,
}

export interface MailboxPostRequest extends BaseMailboxAttributes{
    domain: string,
    local_part: string,
    tls_enforce_in: boolean,
    tls_enforce_out: boolean,
}

export interface MailboxDeleteRequest {
    domains: string[]
}

export type MailboxEditAttributes = BaseMailboxAttributes & {
    sender_acl: string[]
    sogo_access: boolean
}

export interface MailboxEditRequest {
    attr: Partial<MailboxEditAttributes>
    items: string[]
}

export interface MailboxResponse {
    username: string,
    active: boolean
    active_int: boolean
    domain: string,
    domain_xmpp: boolean
    name: string,
    domain_xmpp_prefix: string,
    local_part: string,
    quota: number,
    messages: boolean,
    attributes: {
        force_pw_update: boolean,
        tls_enforce_in: boolean,
        tls_enforce_out: boolean,
        sogo_access: boolean,
        imap_access: boolean,
        pop3_access: boolean,
        smtp_access: boolean,
        xmpp_access: boolean,
        xmpp_admin: boolean,
        mailbox_format: string,
        quarantine_notification: QuarantineSchedule,
        quarantine_category: QuarantineCategory
    },
    quota_used: boolean,
    percent_in_use: boolean,
    last_imap_login: boolean,
    last_smtp_login: boolean,
    last_pop3_login: boolean,
    percent_class: string,
    max_new_quota: number,
    spam_aliases: boolean,
    pushover_active: boolean,
    rl: {
        value: number,
        frame: RelayFrame,
    },
    rl_scope: string,
    is_relayed: boolean
}

export interface PushoverEditAttributes {
    active: boolean,
    evaluate_x_prio: boolean,
    key: string,
    only_x_prio: boolean,
    senders: string,
    senders_regex: string,
    text: string,
    title: string,
    token: string,
}

export interface PushoverEditRequest {
    attr: Partial<PushoverEditAttributes>
    items: string
}


type QuarantineSchedule = "hourly" | "daily" | "weekly" | "never"

type QuarantineCategory = "reject" | "add_header" | "all"

export interface QuarantaineEditRequest {
    attr: {
        quarantine_notification: QuarantineSchedule
    }
    items: {
        anyOf: string[]
    }
}

export interface SpamScoreEditRequest {
    items: string[],
    attr: {
        spam_score: string,
    }
}

type userAcl = "spam_alias" | "tls_policy" | "spam_score" | "spam_policy" | "delimiter_action" | "syncjobs" | "eas_reset"
| "quarantine" | "sogo_profile_reset" | "quarantine_attachments" | "quarantine_notification" | "app_passwds" | "pushover"

export interface ACLEditRequest {
    items: string[],
    attr: {
        user_acl: userAcl[]
    }
}

export type AliasAttributes = {
    address: string,
    goto: string,
    goto_null?: boolean,
    goto_spam?: boolean,
    goto_ham?: boolean,
    sogo_visible: boolean,
    active: boolean,
}

export type AliasPostRequest = AliasAttributes

export interface AliasUpdateRequest {
    items: number[]
    attr: AliasAttributes,
}

export interface AliasDeleteRequest {
    items: number[]
}

export interface AliasResponse {
    in_primary_domain: string,
    id: number,
    domain: string,
    public_comment: string,
    private_comment: string,
    goto: string,
    address: string,
    is_catch_all: boolean,
    active: boolean,
    created: string,
    modified: string,
}

export class MailcowException extends Error {
    message: string;
}

/**
 * Interface for a general Mailcow API response.
 *
 * This is used when the API call doesn't return any objects, i.e. POST requests.
 */
export type MailcowResponse = MailcowResponseContent[]

export interface MailcowResponseContent {
    log?: (string | Payload)[],
    msg: string[] | string,
    type: "succes" | "danger" | "error"
}

export interface MailcowErrorResponse extends MailcowResponse {
    msg: string
}