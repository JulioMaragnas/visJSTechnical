import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'timeline',
    loadChildren: './timeline/timeline.module#TimelineModule'
  },
  { path: '', pathMatch: 'full', redirectTo: '/timeline'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
