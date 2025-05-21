import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CaptchaDialogComponent } from './components/capture-dialog/captcha-dialog.component';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';

@Component({
  selector: 'app-hide-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule,
  ],
  templateUrl: './hide-login.component.html',
  styleUrl: './hide-login.component.scss'
})
export class HideLoginComponent {
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
  })
  errorMessage = ""
  hidePassword = true
  attempt = 3;

  // Mock credentials for demonstration
  private validUsername = "Adam"
  private validPassword = "5032"

  openHelpDialog(): void {
    // First open the CAPTCHA dialog
    const captchaDialogRef = this.dialog.open(CaptchaDialogComponent, {
      width: "350px",
      disableClose: true,
      panelClass: "captcha-dialog",
    })

    // Only open the help dialog if CAPTCHA is verified
    captchaDialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // CAPTCHA verified, open the help dialog
        this.dialog.open(HelpDialogComponent, {
          width: "350px",
          panelClass: "help-dialog",
        })
      }
    })
  }

  onSubmit(): void {
    if (this.attempt > 0) {
      this.attempt -= 1
    }
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value

      if (username === this.validUsername && password === this.validPassword) {
        this.errorMessage = ""
        // alert("Login successful!")
        this.playSucsessSound()
        setTimeout(() => {
          this.router.navigate(['/mySpace']);
        }, 3000)
        // Here you would typically navigate to another page or set authentication state
      } else {
        this.errorMessage = "Invalid username or password"
        this.playErrorSound()
      }
    } else {
      this.errorMessage = "Please fill all required fields correctly"
      this.playErrorSound()
    }
  }

  playErrorSound(): void {
    const audio = new Audio("/wrong.m4a")
    audio.play().catch((error) => console.error("Error playing sound:", error))
  }

  playSucsessSound(): void {
    const audio = new Audio("/aah.m4a")
    audio.play().catch((error) => console.error("Error playing sound:", error))
  }
}

