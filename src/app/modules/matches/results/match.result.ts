import { PlayerName } from "../../l4d2-play-stats/player-name";

export interface MatchResult {
    matchStart: Date;
    matchEnd: Date;
    matchElapsed: string | null;
    campaign: string | null;
    teams: TeamResult[];
    statistics: string[];
}

export interface TeamResult {
    score: number;
    players: PlayerName[];
}