import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WikiComponent } from './components/wiki/wiki.component';
import { AnalyticalDataComponent } from './components/analytical-data/analytical-data.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { adminGuardGuard } from './guards/admin-guard.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"wiki/:title",component:WikiComponent},
  {path:"charts",canActivate:[adminGuardGuard], component:AnalyticalDataComponent},
  {path:"admin/auth",canActivate:[adminGuardGuard], component:AdminLoginComponent},
  {path:"**",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
