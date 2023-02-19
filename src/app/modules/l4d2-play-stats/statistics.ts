import { GameRound } from "./game-round";
import { InfectedPlayer } from "./infected-player";
import { Player } from "./player";
import { PlayerName } from "./player-name";
import { Progress } from "./progress";
import { RoundHalf } from "./round-half";
import { Scoring } from "./scoring";

export interface Statistics {
    gameRound: GameRound | null;
    halves: Half[];
    scoring: Scoring | null;
    playerNames: PlayerName[];
    teamA: PlayerName[];
    teamB: PlayerName[];
}

export interface Half {
    roundHalf: RoundHalf | null;
    progress: Progress | null;
    players: Player[];
    infectedPlayers: InfectedPlayer[];
}