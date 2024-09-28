import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VibrationService {

  private audio: HTMLAudioElement;
  constructor() {
    // Initialize the audio element with the sound file
    this.audio = new Audio('assets/notification_sound.mp3');
  }

  // Method to trigger vibration
  vibrate(pattern: number | number[]): void {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    } else {
      console.warn('Vibration API is not supported in this browser.');
    }
  }

  playSound(): void {
    this.audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  }
}
