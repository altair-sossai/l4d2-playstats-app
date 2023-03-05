import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BreadcrumbModule, ButtonModule, IconModule, LinkModule, ListModule, ModalModule, PlaceholderModule, SkeletonModule, StructuredListModule, TableModule, TabsModule, TagModule, TilesModule, UIShellModule } from 'carbon-components-angular';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchStatisticComponent } from './modules/matches/components/match-statistic/match-statistic.component';
import { MatchStatisticsComponent } from './modules/matches/components/match-statistics/match-statistics.component';
import { MatchesComponent } from './modules/matches/components/matches/matches.component';
import { PlayerStatisticsComponent } from './modules/player-statistics/components/player-statistics/player-statistics.component';
import { RankingComponent } from './modules/ranking/components/ranking/ranking.component';
import { ServerComponent } from './modules/server/components/server/server.component';
import { ServersComponent } from './modules/server/components/servers/servers.component';
import { ScoreComponent } from './modules/shared/components/score/score.component';
import { StatisticDetailComponent } from './modules/statistics/components/statistic-detail/statistic-detail.component';
import { StatisticComponent } from './modules/statistics/components/statistic/statistic.component';
import { StatisticsComponent } from './modules/statistics/components/statistics/statistics.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    ServersComponent,
    ServerComponent,
    MatchesComponent,
    MatchStatisticsComponent,
    MatchStatisticComponent,
    StatisticComponent,
    StatisticDetailComponent,
    RankingComponent,
    PlayerStatisticsComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UIShellModule,
    IconModule,
    TilesModule,
    SkeletonModule,
    TableModule,
    ListModule,
    LinkModule,
    BreadcrumbModule,
    StructuredListModule,
    TabsModule,
    ModalModule,
    ButtonModule,
    TagModule,
    PlaceholderModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
