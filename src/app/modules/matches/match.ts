import { PlayerName } from "../l4d2-play-stats/player-name";

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
    players: PlayerName[];
}