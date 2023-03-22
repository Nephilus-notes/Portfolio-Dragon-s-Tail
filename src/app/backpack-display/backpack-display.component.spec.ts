import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackpackDisplayComponent } from './backpack-display.component';
import { Character } from '../character';
import { CharacterService } from '../character.service';

describe('BackpackDisplayComponent', () => {
  let component: BackpackDisplayComponent;
  let service: CharacterService;
  let fixture: ComponentFixture<BackpackDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackpackDisplayComponent ]
    })
    .compileComponents();
    
    service = TestBed.inject(CharacterService);
    fixture = TestBed.createComponent(BackpackDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
