import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameDisplayComponent } from './views/game-display/game-display.component';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { BackpackDisplayComponent } from './components/backpack-display/backpack-display.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { IndexComponent } from './views/index/index.component';
import { MessagesComponent } from './components/messages/messages.component';
import { UIformComponent } from './components/uiform/uiform.component';
import { TextDisplayComponent } from './components/text-display/text-display.component';
import { CombatDisplayComponent } from './components/combat-display/combat-display.component';
import { LoadGameComponent } from './views/load-game/load-game.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { CreateUserComponent } from './views/create-user/create-user.component';
import { ShopDisplayComponent } from './components/shop-display/shop-display.component';
import { SelectedItemComponent } from './components/selected-item/selected-item.component';
import { StartGameComponent } from './views/start-game/start-game.component';

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
    TextDisplayComponent,
    CombatDisplayComponent,
    LoadGameComponent,
    LoginPageComponent,
    CreateUserComponent,
    ShopDisplayComponent,
    SelectedItemComponent,
    StartGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
