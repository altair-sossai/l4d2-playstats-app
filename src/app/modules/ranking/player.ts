export interface Player {
    communityId: number;
    steamId: string | null;
    steam3: string | null;
    profileUrl: string | null;
    position: number;
    name: string | null;
    points: number;
    draw: number;
    wins: number;
    loss: number;
}