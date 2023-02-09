import { Statistics } from "../../l4d2-play-stats/statistics";

export interface StatisticsResult {
    server: string | null;
    fileName: string | null;
    statistic: Statistics | null;
}