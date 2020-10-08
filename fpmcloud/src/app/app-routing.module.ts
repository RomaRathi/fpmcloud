import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelecComponent } from './selections/selec.component';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
const routes: Routes = [
  
  {
    path: 'selections',
    component: SelecComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: '',
    component: HomeComponent 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
