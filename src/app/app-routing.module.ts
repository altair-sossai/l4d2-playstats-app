import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { LockedScreenComponent } from './modules/auth/components/locked-screen/locked-screen.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', component: LockedScreenComponent },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }