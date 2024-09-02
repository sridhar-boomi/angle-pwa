import { Component } from '@angular/core';
import { Lights } from '../constants/app-data';
import { ActivatedRoute } from '@angular/router';
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
  lightBeamStyle = {};
  angleNumberStyle = {};

  constructor(private activatedRoute: ActivatedRoute,
    private deviceSensorService: DeviceSensorService) { }

  ngOnInit(): void {

    this.fetchExpectedAngle();
    this.initiateAlignment();
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

  fetchExpectedAngle() {
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

  isAngleCorrect(): boolean {
    return Math.abs(this.angle - this.expectedAngle) <= this.tolerance;
  }
}
