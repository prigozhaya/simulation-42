import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideLoginComponent } from './hide-login.component';

describe('HideLoginComponent', () => {
  let component: HideLoginComponent;
  let fixture: ComponentFixture<HideLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HideLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HideLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
