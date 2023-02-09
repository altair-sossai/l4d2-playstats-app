export interface GameRound {
    round: number;
    when: string;
    teamSize: number;
    configurationName: string | null;
    mapName: string | null;
}