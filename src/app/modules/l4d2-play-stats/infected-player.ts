export interface InfectedPlayer {
    index: number;
    client: number;
    steamId: string | null;
    dmgTotal: number;
    dmgUpright: number;
    dmgTank: number;
    dmgTankIncap: number;
    dmgScratch: number;
    dmgSpit: number;
    dmgBoom: number;
    dmgTankUp: number;
    hunterDPs: number;
    hunterDpDmg: number;
    jockeyDPs: number;
    deathCharges: number;
    booms: number;
    ledged: number;
    common: number;
    spawns: number;
    spawnSmoker: number;
    spawnBoomer: number;
    spawnHunter: number;
    spawnCharger: number;
    spawnSpitter: number;
    spawnJockey: number;
    tankPasses: number;
    timeStartPresent: string;
    timeStopPresent: string;
}