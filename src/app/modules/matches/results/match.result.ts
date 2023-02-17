import { PlayerName } from "../../l4d2-play-stats/player-name";

export interface MatchResult {
    matchDate: Date;
    campaign: string | null;
    teams: TeamResult[];
    statistics: string[];
}

export interface TeamResult {
    score: number;
    players: PlayerName[];
}