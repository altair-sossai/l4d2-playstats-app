export interface Player {
    communityId: number;
    steamId: string | null;
    steam3: string | null;
    profileUrl: string | null;
    name: string | null;
    survivorStats: SurvivorStats;
    infectedStats: InfectedStats;
}

export interface SurvivorStats {
    common: number;
    siKilled: number;
    siDamage: number;
}

export interface InfectedStats {
    dmgTotal: number;
}