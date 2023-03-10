import { GameRound } from "../../l4d2-play-stats/game-round";
import { PlayerName } from "../../l4d2-play-stats/player-name";
import { Scoring } from "../../l4d2-play-stats/scoring";

export interface StatisticsSimplifiedResult {
    server: string | null;
    fileName: string | null;
    statisticId: string | null;
    gameRound: GameRound | null;
    scoring: Scoring | null;
    teamA: PlayerName[];
    teamB: PlayerName[];
    mapStart: Date;
    mapEnd: Date;
    mapElapsed: string | null;
}