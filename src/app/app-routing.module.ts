import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchStatisticComponent } from './modules/matches/components/match-statistic/match-statistic.component';
import { MatchStatisticsComponent } from './modules/matches/components/match-statistics/match-statistics.component';
import { MatchesComponent } from './modules/matches/components/matches/matches.component';
import { ServerComponent } from './modules/server/components/server/server.component';
import { ServersComponent } from './modules/server/components/servers/servers.component';
import { StatisticComponent } from './modules/statistics/components/statistic/statistic.component';
import { StatisticsComponent } from './modules/statistics/components/statistics/statistics.component';

const routes: Routes = [
  { path: '', component: ServersComponent },
  { path: 'server/:server', component: ServerComponent },
  { path: 'server/:server/matches', component: MatchesComponent },
  { path: 'server/:server/matches/:start/:end/statistics', component: MatchStatisticsComponent },
  { path: 'server/:server/matches/:start/:end/statistics/:statisticId', component: MatchStatisticComponent },
  { path: 'server/:server/statistics', component: StatisticsComponent },
  { path: 'server/:server/statistics/:statisticId', component: StatisticComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }