import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angle-pwa';
  latestBeta: number = 0;
  latestGamma: number = 0;
  tiltAngle: number = 0;
  ngOnInit(): void {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.handleOrientation, true);
    } else {
      alert("DeviceOrientationEvent is not supported on this device.");
      //console.log("DeviceOrientationEvent is not supported on this device.");
    }
  }

  handleOrientation = (event: DeviceOrientationEvent) => {
    this.latestBeta = event.beta ?? 0;
    this.latestGamma = event.gamma ?? 0;
    this.tiltAngle = Math.sqrt((this.latestBeta ? this.latestBeta * this.latestBeta : 0) + (this.latestGamma ? this.latestGamma * this.latestGamma : 0));
  }

  // calculateTiltAngle(){
  //   alert("calculateTiltAngle");
  //   this.tiltAngle = Math.sqrt((this.latestBeta ? this.latestBeta * this.latestBeta : 0) + (this.latestGamma ? this.latestGamma * this.latestGamma : 0));
  // }
}
