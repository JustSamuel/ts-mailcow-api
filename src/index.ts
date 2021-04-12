import AliasEndpoints from "./Endpoints/AliasEndpoints";

export default class MailCowClient {

    readonly BASE_URL: string;
    readonly API_KEY: string;

    constructor(BASE_URL: string, API_KEY: string) {
        this.BASE_URL = BASE_URL;
        this.API_KEY = API_KEY;
        console.log(`${this.BASE_URL}, ${this.API_KEY}`)
    }

    public getAllEndpoints = AliasEndpoints.getAllEndpoints;

}

const mmc = new MailCowClient("test_url", "test_key");
console.log(mmc.getAllEndpoints());