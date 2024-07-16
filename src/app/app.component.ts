import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // this is for slider range value
  rangeValue: number = 0;
  generatedPass: string = '';

  // checkbox options
  includeUppercase: boolean = false;
  includeLowercase: boolean = false;
  includeNumbers: boolean = false;
  includeSymbols: boolean = false;
  // checkbox toggles function
  toggleUppercase() {
    this.includeUppercase = !this.includeUppercase;
  }
  toggleLowercase() {
    this.includeLowercase = !this.includeLowercase;
  }
  toggleNumbers() {
    this.includeNumbers = !this.includeNumbers;
  }
  toggleSymbols() {
    this.includeSymbols = !this.includeSymbols;
  }
  // password combos
  uppercaseChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  lowercaseChars: string = 'abcdefghijklmnopqrstuvwxyz';
  numberChars: string = '0123456789';
  symbolChars: string = '!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';

  // password generate function
  generatePass() {
    // Disabled Copied Text if enabled
    this.isCopied = false;
    //generates new password
    let chars = '';
    if (this.includeUppercase) chars += this.uppercaseChars;
    if (this.includeLowercase) chars += this.lowercaseChars;
    if (this.includeNumbers) chars += this.numberChars;
    if (this.includeSymbols) chars += this.symbolChars;

    if (chars.length === 0) {
      return;
    }

    // Generate password
    let password = '';
    for (let i = 0; i < this.rangeValue; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }

    this.generatedPass = password;
  }

  // copy Password to clipboard function
  isCopied: boolean = false;
  copyPassword() {
    // toggle Copied text
    this.isCopied = true;
    // Select the text inside the input field
    this.tocopy.nativeElement.select();
    this.tocopy.nativeElement.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the input field to clipboard
    navigator.clipboard
      .writeText(this.tocopy.nativeElement.value)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text to clipboard:', err);
      });
  }

  // fetches the slider element
  @ViewChild('slider') slider!: ElementRef;
  @ViewChild('tocopy') tocopy!: ElementRef;

  ngAfterViewInit(): void {
    // this.rangeValue =
    //   (this.slider.nativeElement.min + this.slider.nativeElement.max) / 2;
    // this.updateSliderBackground();
    setTimeout(() => {
      this.rangeValue =
        (this.slider.nativeElement.min + this.slider.nativeElement.max) / 2;
      this.updateSliderBackground();
    });
  }

  // the functions below controls the slider range

  // Function to update the color behind the slider thumb as it moved to green
  updateSliderBackground(): void {
    const percentage =
      ((this.rangeValue - this.slider.nativeElement.min) /
        (this.slider.nativeElement.max - this.slider.nativeElement.min)) *
      100;
    const remainingPercentage = 100 - percentage;
    this.slider.nativeElement.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, black ${percentage}%, black ${remainingPercentage}%)`;
  }

  // this function sets current slider value rangevalue to be used as
  // password length
  onRangeInput(event: Event): void {
    this.updateSliderBackground();
    const inputElement = event.target as HTMLInputElement;
    this.rangeValue = Number(inputElement.value);
  }
}
