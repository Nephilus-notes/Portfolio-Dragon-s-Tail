import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDisplayComponent } from './game-display/game-display.component';

const routes: Routes = [
  { path: 'game', component: GameDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
