import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameDisplayComponent } from './game-display/game-display.component';
import { CharacterInfoComponent } from './character-info/character-info.component';
import { BackpackDisplayComponent } from './backpack-display/backpack-display.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { IndexComponent } from './index/index.component';
import { MessagesComponent } from './messages/messages.component';
import { UIformComponent } from './uiform/uiform.component';

@NgModule({
  declarations: [
    AppComponent,
    GameDisplayComponent,
    CharacterInfoComponent,
    BackpackDisplayComponent,
    NavBarComponent,
    IndexComponent,
    MessagesComponent,
    UIformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
