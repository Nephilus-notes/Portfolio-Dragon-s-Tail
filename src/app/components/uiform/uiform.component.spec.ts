import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { UIformComponent } from './uiform.component';

describe('UIformComponent', () => {
  let component: UIformComponent;
  let fixture: ComponentFixture<UIformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UIformComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UIformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

});
