export interface GameRound {
    round: number;
    when: Date;
    teamSize: number;
    configurationName: string | null;
    mapName: string | null;
}