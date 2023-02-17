export interface Scoring {
    teamA: Team | null;
    teamB: Team | null;
}

export interface Team {
    letter: string | null;
    firstScoresSet: number;
    score: number;
}