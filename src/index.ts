import {AxiosRequestConfig} from "axios";
import AliasEndpoints from "./Endpoints/alias-endpoints";
import DomainEndpoints from "./Endpoints/domain-endpoints";
import AntiSpamEndpoints from "./Endpoints/antispam-endpoints";
import MailboxEndpoints from "./Endpoints/mailbox-endpoint";

export default class MailCowClient {

    readonly BASE_URL: string;
    readonly API_KEY: string;

    HEADERS: {};

    constructor(BASE_URL: string, API_KEY: string) {
        this.BASE_URL = BASE_URL;
        this.API_KEY = API_KEY;

        this.HEADERS = {
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.API_KEY,
            }
        } as AxiosRequestConfig
    }

    public alias = {
        get: AliasEndpoints.getAliases.bind(this),
        create: AliasEndpoints.createAlias.bind(this),
        update: AliasEndpoints.updateAlias.bind(this),
        delete: AliasEndpoints.deleteAlias.bind(this),
    }

    public domain = {
        create: DomainEndpoints.createDomain.bind(this),
        edit: DomainEndpoints.editDomain.bind(this),
        delete: DomainEndpoints.deleteDomain.bind(this),
        get: DomainEndpoints.getDomain.bind(this),
    }

    public spamPolicy = {
        create: AntiSpamEndpoints.createSpamPolicy.bind(this),
        delete: AntiSpamEndpoints.deleteSpamPolicy.bind(this),
        get: AntiSpamEndpoints.getSpamPolicyList.bind(this),
    }

    public mailbox = {
        create: MailboxEndpoints.createMailbox.bind(this),
        delete: MailboxEndpoints.deleteMailbox.bind(this),
        edit: MailboxEndpoints.editMailbox.bind(this),
        get: MailboxEndpoints.getMailbox.bind(this),
        spamscore: {
            edit: MailboxEndpoints.editSpamScore.bind(this),
        }
    }

    public acl = {
        edit: MailboxEndpoints.editUserACL.bind(this),
    }

    public pushover = {
        edit: MailboxEndpoints.editPushover.bind(this),
    }

    public quarantineNotification = {
        edit: MailboxEndpoints.editQuarantine.bind(this),
    }
}