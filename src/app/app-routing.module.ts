import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouletteDemoComponent } from './Component/roulette-demo/roulette-demo.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'roulette-demo'
  },
  {
    path: 'roulette-demo',
    component: RouletteDemoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
