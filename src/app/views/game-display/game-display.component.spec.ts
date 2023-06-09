import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { GameDisplayComponent } from './game-display.component';
import { BackpackDisplayComponent } from '../../components/backpack-display/backpack-display.component';
import { CharacterInfoComponent } from '../../components/character-info/character-info.component';
import { UIformComponent } from '../../components/uiform/uiform.component';
import { TextDisplayComponent } from '../../components/text-display/text-display.component';

describe('GameDisplayComponent', () => {
  let component: GameDisplayComponent;
  let fixture: ComponentFixture<GameDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDisplayComponent, UIformComponent,
        TextDisplayComponent,
        CharacterInfoComponent, BackpackDisplayComponent ],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDisplayComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
