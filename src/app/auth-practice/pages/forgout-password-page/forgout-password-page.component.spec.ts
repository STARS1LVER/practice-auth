import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgoutPasswordPageComponent } from './forgout-password-page.component';

describe('ForgoutPasswordPageComponent', () => {
  let component: ForgoutPasswordPageComponent;
  let fixture: ComponentFixture<ForgoutPasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgoutPasswordPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgoutPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
