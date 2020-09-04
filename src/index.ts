import "./interfaces";
import got, { Got } from "got";

process.on("unhandledRejection", (error: any) => {
  // Will print "unhandledRejection err is not defined"
  console.log("Error:", error.message);
});

/**
 * cocApi - Fast and easy way to interact with Clash of Clans API. Supports TypeScript Intellisense!
 * Inspirited by clash-of-clans-api.
 * Generate a token in https://developer.clashofclans.com/#/new-key.
 * Return a client promise.
 *
 * @example
 * var cocClient = new cocApi(token, timeout: 5000);
 */
export class cocApi {
  token?: string;
  uri?: string;
  timeout: number;
  client: Got;

  /**
   * Start a client to interact with the COC Api.
   *
   * @param token COC Api Token.
   * @param uri COC Api base url.
   * @param timeout Timeout from the request.
   */
  constructor({
    token,
    uri,
    timeout,
  }: {
    token?: string;
    uri?: string;
    timeout?: number;
  }) {
    this.token = token || process.env.token;
    this.uri = uri || "https://api.clashofclans.com/v1/";
    this.timeout = timeout || 3000;

    if (!this.token) {
      // Token is mandatory.
      throw new Error("Specify a token.");
    }

    this.client = got.extend({
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
            var err;
            switch (error.response?.statusCode) {
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
            return Promise.reject(new Error(err)) as any;
          },
        ],
      },
    });
  }

  /**
   * Retrieve information about clan's current clan war.
   *
   * @example
   * cocApi
   * .currentWar('#9CCJ999V')
   *
   * @param {string} tag - Tag of the clan.
   */
  currentWar(tag: string) {
    return this.client.get(`clans/${encodeURIComponent(tag)}/currentwar`).then(
      (res: any): currentWarClanCOC => {
        return res.body as currentWarClanCOC;
      }
    );
  }

  /**
   * Retrieve information about clan's current clan war league group.
   *
   * @example
   * cocApi
   * .leagueGroup('#9CCJ999V')
   *
   * @param {string} tag - Tag of the clan.
   */
  leagueGroup(tag: string) {
    return this.client
      .get(`clans/${encodeURIComponent(tag)}/currentwar/leaguegroup`)
      .then(
        (res: any): leagueGroupCOC => {
          return res.body as leagueGroupCOC;
        }
      );
  }

  /**
   * Get clan information.
   *
   * @example
   * cocApi
   * .clanByTag('#9CCJ999V')
   *
   * @param {string} tag - Tag of the clan.
   */
  clanByTag(tag: string) {
    return this.client.get(`clans/${encodeURIComponent(tag)}`).then(
      (res: any): clanCOC => {
        return res.body as clanCOC;
      }
    );
  }

  /**
   * Retrieve information about individual clan war league war.
   *
   * @example
   * cocApi
   * .clanWarLeagueByTag('#9CC0753J')
   *
   * @param {string} warTag - Tag of the war.
   */
  clanWarLeagueByTag(warTag: string) {
    return this.client
      .get(`clanwarleagues/wars/${encodeURIComponent(warTag)}`)
      .then(
        (res: any): leagueGroupCOC => {
          return res.body as leagueGroupCOC;
        }
      );
  }

  /**
   * Retrieve clan's clan war log.
   *
   * @example
   * cocApi
   * .clanWarLog('#9CC0753J')
   *
   * @param {string} tag - Tag of the clan.
   */
  clanWarLog(tag: string) {
    return this.client.get(`clans/${encodeURIComponent(tag)}/warlog`).then(
      (res: any): warLogCOC => {
        return res.body as warLogCOC;
      }
    );
  }

  /**
   * List clan members.
   *
   * @example
   * cocApi
   * .clanWarLeagueByTag('#9CC0753J')
   *
   * @param {string} tag - Tag of the war.
   */
  clanMembers(tag: string) {
    return this.client.get(`clans/${encodeURIComponent(tag)}/members`).then(
      (res: any): itemsClanCOC => {
        return res.body as itemsClanCOC;
      }
    );
  }

  /**
   * Get player information.
   *
   *
   * @param {string} playerTag - Tag of the player.
   */
  playerByTag(playerTag: any) {
    return this.client.get(`players/${encodeURIComponent(playerTag)}`).then(
      (res: any): playerCOC => {
        return res.body as playerCOC;
      }
    );
  }

  /**
   * Get a list of clans by clan name.
   *
   *
   * @param {string} clanName - Name of the clan.
   */
  clanByName(clanName: string) {
    return this.client.get(`clans/?name=${encodeURIComponent(clanName)}`).then(
      (res: any): listClansCOC => {
        return res.body as listClansCOC;
      }
    );
  }

  // TODO: Leagues
  // TODO: Locations
  // TODO: Labels
}
