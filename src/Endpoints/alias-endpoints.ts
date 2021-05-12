import MailCowClient from "../index";

export default {
    getAllEndpoints: function (this: MailCowClient) {
        console.log(`Getting all endpoints on ${this.BASE_URL} using ${this.API_KEY}`)
    }
}