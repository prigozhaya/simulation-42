import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-captcha-dialog',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule,],
  templateUrl: './captcha-dialog.component.html',
  styleUrl: './captcha-dialog.component.scss'
})
export class CaptchaDialogComponent implements OnInit {

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CaptchaDialogComponent>);
  // private fb: FormBuilder,
  captchaForm: FormGroup = this.fb.group({
    answer: ["", [Validators.required]],
  })
  captchaVerified = false
  errorMessage = ""

  // CAPTCHA challenge data
  captchaType = "math" // or "image"
  mathProblem = {
    num1: 0,
    num2: 0,
    operator: "+",
    result: 0,
  }

  // Image selection CAPTCHA data
  imageOptions = [
    { id: 1, name: "Circle", selected: false },
    { id: 2, name: "Square", selected: false },
    { id: 3, name: "Triangle", selected: false },
    { id: 4, name: "Star", selected: false },
  ]
  correctImageId = 0
  captchaInstruction = ""

  // constructor(
  //   private dialogRef: MatDialogRef<CaptchaDialogComponent>,
  //   private fb: FormBuilder,
  // ) {}

  ngOnInit(): void {


    // Randomly choose between math or image CAPTCHA
    this.captchaType = Math.random() > 0.5 ? "math" : "image"

    if (this.captchaType === "math") {
      this.generateMathProblem()
    } else {
      this.setupImageCaptcha()
    }
  }

  generateMathProblem(): void {
    // Generate two random numbers between 1 and 10
    this.mathProblem.num1 = Math.floor(Math.random() * 10) + 1
    this.mathProblem.num2 = Math.floor(Math.random() * 10) + 1

    // Choose a random operator
    const operators = ["+", "-", "×"]
    this.mathProblem.operator = operators[Math.floor(Math.random() * operators.length)]

    // Calculate the result
    switch (this.mathProblem.operator) {
      case "+":
        this.mathProblem.result = this.mathProblem.num1 + this.mathProblem.num2
        break
      case "-":
        // Ensure the result is positive
        if (this.mathProblem.num1 < this.mathProblem.num2) {
          ;[this.mathProblem.num1, this.mathProblem.num2] = [this.mathProblem.num2, this.mathProblem.num1]
        }
        this.mathProblem.result = this.mathProblem.num1 - this.mathProblem.num2
        break
      case "×":
        this.mathProblem.result = this.mathProblem.num1 * this.mathProblem.num2
        break
    }
  }

  setupImageCaptcha(): void {
    // Randomly select the correct image
    this.correctImageId = Math.floor(Math.random() * 4) + 1
    const correctShape = this.imageOptions.find((img) => img.id === this.correctImageId)?.name
    this.captchaInstruction = `Select the ${correctShape}`
  }

  selectImage(id: number): void {
    // Reset all selections
    this.imageOptions.forEach((img) => (img.selected = false))

    // Set the selected image
    const selectedImage = this.imageOptions.find((img) => img.id === id)
    if (selectedImage) {
      selectedImage.selected = true
    }
  }

  verifyCaptcha(): void {
    if (this.captchaType === "math") {
      const userAnswer = Number.parseInt(this.captchaForm.get("answer")?.value, 10)

      if (isNaN(userAnswer)) {
        this.errorMessage = "Please enter a valid number"
        return
      }

      if (userAnswer === this.mathProblem.result) {
        this.captchaVerified = true
        this.dialogRef.close(true)
      } else {
        this.errorMessage = "Incorrect answer, please try again"
        this.generateMathProblem() // Generate a new problem
        this.captchaForm.reset()
      }
    } else {
      // Image CAPTCHA verification
      const selectedImage = this.imageOptions.find((img) => img.selected)

      if (!selectedImage) {
        this.errorMessage = "Please select an image"
        return
      }

      if (selectedImage.id === this.correctImageId) {
        this.captchaVerified = true
        this.dialogRef.close(true)
      } else {
        this.errorMessage = "Incorrect selection, please try again"
        this.setupImageCaptcha() // Generate a new image challenge
        this.imageOptions.forEach((img) => (img.selected = false))
      }
    }
  }

  cancel(): void {
    this.dialogRef.close(false)
  }
}
