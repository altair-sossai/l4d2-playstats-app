export interface RoundHalf {
    round: number;
    team: string | null;
    restarts: number;
    pillsUsed: number;
    kitsUsed: number;
    defibsUsed: number;
    common: number;
    siKilled: number;
    siDamage: number;
    siSpawned: number;
    witchKilled: number;
    tankKilled: number;
    incaps: number;
    deaths: number;
    ffDamageTotal: number;
    startTime: Date;
    endTime: Date;
    startTimePause: Date;
    stopTimePause: Date;
    startTimeTank: Date;
    stopTimeTank: Date;
}