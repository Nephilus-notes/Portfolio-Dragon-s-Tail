import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameDisplayComponent } from './game-display/game-display.component';
import { CharacterInfoComponent } from './character-info/character-info.component';
import { BackpackDisplayComponent } from './backpack-display/backpack-display.component';

@NgModule({
  declarations: [
    AppComponent,
    GameDisplayComponent,
    CharacterInfoComponent,
    BackpackDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
