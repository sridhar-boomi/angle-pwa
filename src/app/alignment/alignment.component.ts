import { Component, Injectable } from '@angular/core';
import { Lights } from '../constants/app-data';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { DeviceSensorService } from './device-sensor-service';

@Component({
  selector: 'app-alignment',
  templateUrl: './alignment.component.html',
  styleUrl: './alignment.component.scss'
})
export class AlignmentComponent {
  serie: string = '';
  lightType: string = '';
  lights = Lights;
  expectedAngle: number = 0;
  latestAlpha: number = 0;
  latestBeta: number = 0;
  latestGamma: number = 0;
  tiltAngle: number = 0;

  angle: number = 0;
  tolerance: number = 0.2; // Tolerance for angle matching

  lineStyle1 = {};
  lineStyle2 = {};
  lightBeamStyle={};
  angleNumberStyle = {};

  constructor(private activatedRoute: ActivatedRoute,
    private deviceSensorService: DeviceSensorService) { }

  ngOnInit(): void {

    this.fetchExpectedAngle();
    this.initiateAlignment();
    // this.deviceOrientationService.getOrientation().subscribe(event => {
    //   this.angle = event.beta ?? 0;
    // });
    // if (window.DeviceOrientationEvent) {
    //   window.addEventListener('deviceorientation', this.handleOrientation, true);
    // } else {
    //   alert("DeviceOrientationEvent is not supported on this device.");
    //   //console.log("DeviceOrientationEvent is not supported on this device.");
    // }
  }

  backButtonClick() {
    console.log('back button clicked');
    window.history.back();
  }

  initiateAlignment(): void {
    this.deviceSensorService.requestDeviceOrientationPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          this.deviceSensorService.getDeviceOrientation().subscribe(event => {
            this.angle = event.beta ?? 0;
            this.lineStyle1 = {
              transform: `rotate(${-14 + this.angle}deg)`
            };
            this.lineStyle2 = {
              transform: `rotate(${14 + this.angle}deg)`
            };
            this.angleNumberStyle = {
              transform: `rotate(${this.angle}deg)`
            }
          });
        }
      })
      .catch(console.error);
  }

  fetchExpectedAngle(){
    const serie = this.activatedRoute.snapshot.paramMap.get('serie');
    if (serie !== null) {
      this.serie = serie;
    }
    const lightType = this.activatedRoute.snapshot.paramMap.get('lightType');
    if (lightType !== null) {
      this.lightType = lightType;
    }

    const light = this.lights.find(light => light.serie === this.serie);
    const type = light?.types.find(type => type.name === this.lightType);
    this.expectedAngle = type?.angle ?? 0;
    this.lightBeamStyle = {
      transform: `rotate(${this.expectedAngle}deg)`
    }
  }

  // handleOrientation = (event: DeviceOrientationEvent) => {
  //   this.latestAlpha = event.alpha ?? 0;
  //   this.latestBeta = event.beta ?? 0;
  //   this.latestGamma = event.gamma ?? 0;
  //   this.tiltAngle = Math.sqrt((this.latestBeta ? this.latestBeta * this.latestBeta : 0) + (this.latestGamma ? this.latestGamma * this.latestGamma : 0));
  // }

  // handleOrientation = (event: DeviceOrientationEvent) => {
  //   const beta = event.beta ?? 0;   // rotation around x-axis
  //   const gamma = event.gamma ?? 0; // rotation around y-axis

  //   const bubble = document.getElementById('bubble');
  //   if (bubble) {
  //     // Calculate the position of the bubble
  //     const x = gamma * 1.5; // Adjust multiplier to fit bubble within container
  //     const y = beta * 1.5;  // Adjust multiplier to fit bubble within container

  //     // Constrain the bubble within the container bounds
  //     const maxOffset = 140; // Half of the container size minus half of the bubble size
  //     const constrainedX = Math.max(-maxOffset, Math.min(maxOffset, x));
  //     const constrainedY = Math.max(-maxOffset, Math.min(maxOffset, y));

  //     // Update the bubble position
  //     bubble.style.transform = `translate(${constrainedX}px, ${constrainedY}px)`;
  //   }

  //   // Update status text
  //   this.status = `Beta: ${beta?.toFixed(2)}°, Gamma: ${gamma?.toFixed(2)}°`;
  // }

  isAngleCorrect(): boolean {
    return Math.abs(this.angle - this.expectedAngle) <= this.tolerance;
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class DeviceOrientationService {
//   constructor() {}

//   getOrientation(): Observable<DeviceOrientationEvent> {
//     return fromEvent<DeviceOrientationEvent>(window, 'deviceorientation');
//   }
// }
