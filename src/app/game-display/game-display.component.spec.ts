import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDisplayComponent } from './game-display.component';
import { BackpackDisplayComponent } from '../backpack-display/backpack-display.component';
import { CharacterInfoComponent } from '../character-info/character-info.component';

describe('GameDisplayComponent', () => {
  let component: GameDisplayComponent;
  let fixture: ComponentFixture<GameDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDisplayComponent, CharacterInfoComponent, BackpackDisplayComponent ]
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
