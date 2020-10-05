import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorAuthGuard } from '../doctor-auth.guard';
import { ReportNavComponent } from './report-nav/report-nav.component';
import { ReportsComponent } from './reports/reports.component';
const routes: Routes = [ 
{path:'', component: ReportNavComponent ,canActivateChild:[DoctorAuthGuard], children:[
  {path:'', component: ReportsComponent},
]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class ReportRoutingModule { }
