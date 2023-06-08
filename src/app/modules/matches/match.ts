
export interface Match {
    matchStart: Date;
    matchEnd: Date;
    matchElapsed: string | null;
    campaign: string | null;
    teams: Team[];
    statistics: string[];
}

export interface Team {
    score: number;
    players: Player[];
    common: number;
    siKilled: number;
    siDamage: number;
    dmgTank: number;
}

export interface Player {
    steamId: string | null;
    communityId: string | null;
    steam3: string | null;
    profileUrl: string | null;
    index: number;
    name: string | null;
    common: number;
    commonPercentage: number;
    siKilled: number;
    siKilledPercentage: number;
    siDamage: number;
    siDamagePercentage: number;
    dmgTank: number;
    dmgTankPercentage: number;
}