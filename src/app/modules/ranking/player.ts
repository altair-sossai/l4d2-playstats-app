export interface Player {
    communityId: number;
    steamId: string | null;
    steam3: string | null;
    profileUrl: string | null;
    position: number;
    name: string | null;
    wins: number;
    mvps: number;
    loss: number;
}