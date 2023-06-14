export interface Match {
    matchStart: Date;
    matchEnd: Date;
    matchElapsed: string | null;
    campaign: string | null;
    teams: Team[];
    statistics: string[];
}

export interface Team {
    /* Survivor */
    score: number;
    players: Player[];
    died: number;
    incaps: number;
    dmgTaken: number;
    common: number;
    siKilled: number;
    siDamage: number;
    tankDamage: number;
    rockEats: number;
    witchDamage: number;
    skeets: number;
    levels: number;
    crowns: number;
    ffGiven: number;

    /* Infected */
    dmgTotal: number;
    dmgTank: number;
    dmgSpit: number;
    hunterDpDmg: number;

    /* MVP and LVP */
    mvpSiDamage: number;
    mvpCommon: number;
    lvpFfGiven: number;
}

export interface Player {
    steamId: string | null;
    communityId: string | null;
    steam3: string | null;
    profileUrl: string | null;
    index: number;
    name: string | null;

    /* Survivor */
    died: number;
    diedPercentage: number;
    incaps: number;
    incapsPercentage: number;
    dmgTaken: number;
    dmgTakenPercentage: number;
    common: number;
    commonPercentage: number;
    siKilled: number;
    siKilledPercentage: number;
    siDamage: number;
    siDamagePercentage: number;
    tankDamage: number;
    tankDamagePercentage: number;
    rockEats: number;
    rockEatsPercentage: number;
    witchDamage: number;
    witchDamagePercentage: number;
    skeets: number;
    skeetsPercentage: number;
    levels: number;
    levelsPercentage: number;
    crowns: number;
    crownsPercentage: number;
    ffGiven: number;
    ffGivenPercentage: number;

    /* Infected */
    dmgTotal: number;
    dmgTotalPercentage: number;
    dmgTank: number;
    dmgTankPercentage: number;
    dmgSpit: number;
    dmgSpitPercentage: number;
    hunterDpDmg: number;
    hunterDpDmgPercentage: number;

    /* MVP and LVP */
    mvpSiDamage: number;
    mvpSiDamagePercentage: number;
    mvpCommon: number;
    mvpCommonPercentage: number;
    lvpFfGiven: number;
    lvpFfGivenPercentage: number;
}