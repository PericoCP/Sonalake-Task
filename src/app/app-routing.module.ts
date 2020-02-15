import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListViewComponent } from './components/list-view/list-view.component';
import { NewItemComponent } from './components/new-item/new-item.component';

const routes: Routes = [
  { path: 'home', component: ListViewComponent },
  { path: 'add', component: NewItemComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
