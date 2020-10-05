import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
//defining routes
const routes: Routes = [
  {path:'', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path:'reports', loadChildren:()=> import('./report/report.module').then(m=> m.ReportModule)},
  {path:'**', redirectTo:'not-found'},
  {path:'not-found' , component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {scrollPositionRestoration: 'enabled' ,preloadingStrategy: PreloadAllModules
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
