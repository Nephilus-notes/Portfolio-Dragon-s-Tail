import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDisplayComponent } from './game-display/game-display.component';
import { IndexComponent } from './index/index.component';
import { LoadGameComponent } from './load-game/load-game.component';

const routes: Routes = [
  { path: 'game', component: GameDisplayComponent },
  { path: '', component: IndexComponent },
  { path: 'loadgame', component: LoadGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
