import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDisplayComponent } from './views/game-display/game-display.component';
import { IndexComponent } from './views/index/index.component';
import { LoadGameComponent } from './views/load-game/load-game.component';
import { StartGameComponent } from './views/start-game/start-game.component';

const routes: Routes = [
  { path: 'game', component: GameDisplayComponent },
  { path: '', component: IndexComponent },
  { path: 'loadgame', component: LoadGameComponent },
  { path: 'startgame', component: StartGameComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
