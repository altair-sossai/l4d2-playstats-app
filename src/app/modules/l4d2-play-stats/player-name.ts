import { SteamUser } from "./steam/steam-user";

export interface PlayerName extends SteamUser {
    index: number;
    name: string | null;
}