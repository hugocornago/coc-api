"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cocApi = void 0;
require("./interfaces");
const got_1 = __importDefault(require("got"));
process.on("unhandledRejection", (error) => {
    console.log("Error:", error.message);
});
class cocApi {
    constructor({ token, uri, timeout, }) {
        this.token = token || process.env.token;
        this.uri = uri || "https://api.clashofclans.com/v1/";
        this.timeout = timeout || 3000;
        if (!this.token) {
            throw new Error("Specify a token.");
        }
        this.client = got_1.default.extend({
            prefixUrl: this.uri,
            timeout: this.timeout,
            responseType: "json",
            headers: {
                Authorization: `Bearer ${this.token}`,
                Accept: "application/json",
            },
            hooks: {
                beforeError: [
                    (error) => {
                        var _a;
                        var err;
                        switch ((_a = error.response) === null || _a === void 0 ? void 0 : _a.statusCode) {
                            case 400:
                                err = `Provided incorrect parameters for the request.`;
                                break;
                            case 403:
                                err = `Bad Token.`;
                                break;
                            case 404:
                                err = `Tag not found.`;
                                break;
                            case 429:
                                err = `Request was throttled, because amount of requests was above the threshold defined for the used API token.`;
                                break;
                            case 500:
                                err = `Unknown error happened when handling the request.`;
                                break;
                            case 503:
                                err = `Service is temporarily unavailable because of maintenance.`;
                                break;
                            default:
                                err = `Unknown error. Error: ${error}`;
                        }
                        return Promise.reject(new Error(err));
                    },
                ],
            },
        });
    }
    currentWar(tag) {
        return this.client.get(`clans/${encodeURIComponent(tag)}/currentwar`).then((res) => {
            return res.body;
        });
    }
    leagueGroup(tag) {
        return this.client
            .get(`clans/${encodeURIComponent(tag)}/currentwar/leaguegroup`)
            .then((res) => {
            return res.body;
        });
    }
    clanByTag(tag) {
        return this.client.get(`clans/${encodeURIComponent(tag)}`).then((res) => {
            return res.body;
        });
    }
    clanWarLeagueByTag(warTag) {
        return this.client
            .get(`clanwarleagues/wars/${encodeURIComponent(warTag)}`)
            .then((res) => {
            return res.body;
        });
    }
    clanWarLog(tag) {
        return this.client.get(`clans/${encodeURIComponent(tag)}/warlog`).then((res) => {
            return res.body;
        });
    }
    clanMembers(tag) {
        return this.client.get(`clans/${encodeURIComponent(tag)}/members`).then((res) => {
            return res.body;
        });
    }
    playerByTag(playerTag) {
        return this.client.get(`players/${encodeURIComponent(playerTag)}`).then((res) => {
            return res.body;
        });
    }
    clanByName(clanName) {
        return this.client.get(`clans/?name=${encodeURIComponent(clanName)}`).then((res) => {
            return res.body;
        });
    }
}
exports.cocApi = cocApi;
//# sourceMappingURL=index.js.map