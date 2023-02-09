export interface Progress {
    round: number;
    team: string;
    survived: number;
    maxCompletionScore: number;
    maxFlowDist: number;
    flows: Flow[];
}

export interface Flow {
    farFlowDist: number;
    curFlowDist: number;
}