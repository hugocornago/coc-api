import "./interfaces";
import { Got } from "got";
export declare class cocApi {
    token?: string;
    uri?: string;
    timeout: number;
    client: Got;
    constructor({ token, uri, timeout, }: {
        token?: string;
        uri?: string;
        timeout?: number;
    });
    currentWar(tag: string): Promise<currentWarClanCOC>;
    leagueGroup(tag: string): Promise<leagueGroupCOC>;
    clanByTag(tag: string): Promise<clanCOC>;
    clanWarLeagueByTag(warTag: string): Promise<leagueGroupCOC>;
    clanWarLog(tag: string): Promise<itemsWarCOC>;
    clanMembers(tag: string): Promise<itemsClanCOC>;
    playerByTag(playerTag: any): Promise<playerCOC>;
    clanByName(clanName: string): Promise<listClansCOC>;
}
//# sourceMappingURL=index.d.ts.map