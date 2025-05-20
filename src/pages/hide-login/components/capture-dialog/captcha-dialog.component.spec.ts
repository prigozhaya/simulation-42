import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaDialogComponent } from './captcha-dialog.component';

describe('CaptureDialogComponent', () => {
  let component: CaptchaDialogComponent;
  let fixture: ComponentFixture<CaptchaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptchaDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CaptchaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
