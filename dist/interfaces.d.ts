interface minimalClanCOC {
    badgeUrls: {
        small: string;
        large: string;
        medium: string;
    };
    clanLevel: number;
}
interface minimalPlayerCOC {
    tag: string;
    name: string;
    role: "member" | "coLeader" | "admin" | "leader";
    expLevel: number;
    league: {
        id: number;
        name: string;
        iconUrls: {
            small: string;
            tiny: string;
            medium: string;
        };
    };
    trophies: number;
    versusTrophies: number;
    donations: number;
    donationsReceived: number;
}
interface clanCOC extends minimalClanCOC {
    tag: string;
    name: string;
    type: "inviteOnly" | "open" | "closed";
    description?: string;
    location: {
        id: number;
        name: string;
        isCountry: boolean;
        countryCode: string;
    };
    clanLevel: number;
    clanPoints: number;
    clanVersusPoints: number;
    requiredTrophies: number;
    warFrequency: "always" | "moreThanOncePerWeek" | "oncePerWeek" | "lessThanOncePerWeek" | "unknown" | "never";
    warWinStreak: number;
    warWins: number;
    warTies: number;
    warLosses: number;
    isWarLogPublic: boolean;
    warLeague: {
        id: number;
        name: number;
    };
    members: number;
    memberList: Array<minimalPlayerCOC>;
    labels: any;
}
interface enemyClanCOC extends minimalClanCOC {
    tag: string;
    name: string;
    stars: number;
    destructionPercentage: number;
}
interface ownClanCOC extends minimalClanCOC {
    tag: string;
    name: string;
    stars: number;
    destructionPercentage: number;
    attacks: number;
    expEarned: number;
}
interface warLogCOC {
    result: string;
    endTime: string;
    teamSize: number;
    clan: ownClanCOC;
    opponent: enemyClanCOC;
}
interface currentWarClanCOC {
    attacks: number;
    stars: number;
    destructionPercentage: number;
}
interface currentWarCOC {
    state: string;
    clan: currentWarClanCOC;
    opponent: currentWarClanCOC;
}
interface leagueGroupPlayerCOC {
    tag: string;
    name: string;
    townHallLevel: number;
}
interface leagueGroupClanCOC {
    tag: string;
    name: string;
    members: Array<leagueGroupPlayerCOC>;
}
interface leagueGroupCOC {
    state: string;
    season?: string;
    clans?: Array<leagueGroupClanCOC>;
    rounds?: [{
        warTags: [string, string, string, string];
    }];
    teamSize?: number;
}
interface itemsWarCOC {
    items: Array<warLogCOC>;
    paging?: {
        cursors?: {};
    };
}
interface membersClanCOC extends minimalPlayerCOC {
    clanRank: number;
    previousClanRank: number;
}
interface itemsClanCOC {
    items: Array<membersClanCOC>;
    paging?: {
        cursors?: {};
    };
}
interface listClansCOC {
    items: Array<clanCOC>;
    paging?: {
        cursors?: {};
    };
}
interface achievementsCOC {
    name: string;
    stars: number;
    value: number;
    target: number;
    info: string;
    completionInfo: string;
    village: string;
}
interface labelsCOC {
    id: number;
    name: string;
    iconUrls: {
        small: string;
        medium: string;
    };
}
interface armyCOC {
    name: string;
    level: number;
    maxLevel: number;
    village: string;
}
interface clanPlayerCOC extends minimalPlayerCOC {
    clanRank: number;
    previousClanRank: number;
}
interface playerCOC extends minimalPlayerCOC {
    townHallLevel: number;
    bestTrophies: number;
    warStars: number;
    attackWins: number;
    defenseWins: number;
    builderHallLevel: number;
    bestVersusTrophies: number;
    versusBattleWins: number;
    donations: number;
    donationsReceived: number;
    clan: {
        tag: string;
        name: string;
        clanLevel: number;
        badgeUrls: {
            small: string;
            large: string;
            medium: string;
        };
    };
    achievements: Array<achievementsCOC>;
    versusBattleWinCount: number;
    labels: Array<labelsCOC>;
    troops: Array<armyCOC>;
    heroes: Array<armyCOC>;
    spells: Array<armyCOC>;
}
//# sourceMappingURL=interfaces.d.ts.map