import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnScreenComponent } from './inn-screen.component';

describe('InnScreenComponent', () => {
  let component: InnScreenComponent;
  let fixture: ComponentFixture<InnScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
