import { ReportRoutingModule } from './report-routing.module';
import { NgModule } from '@angular/core';
import { ReportsComponent } from './reports/reports.component';
import { ReportNavComponent } from './report-nav/report-nav.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ReportsComponent, ReportNavComponent],
  imports: [
    SharedModule,
    ReportRoutingModule,
  ]
})
export class ReportModule { }
