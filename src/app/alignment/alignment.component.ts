import { Component } from '@angular/core';
import { Lights } from '../constants/app-data';
import { ActivatedRoute } from '@angular/router';
import { DeviceSensorService } from './device-sensor-service';
import { VibrationService } from './vibration.service';
import { OrientationService } from './orientation.service';
import { Observable } from 'rxjs';

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

  lineStyle1TowardsRight = {};
  lineStyle2TowardsRight = {};
  lightBeamStyleTowardsRight = {};
  angleNumberStyleTowardsRight = {};

  isLightTowardsRight = true;

  lineStyle1TowardsLeft = {};
  lineStyle2TowardsLeft = {};
  lightBeamStyleTowardsLeft = {};
  angleNumberStyleTowardsLeft = {};

  isLandscape: Observable<boolean>;

  constructor(private activatedRoute: ActivatedRoute,
    private deviceSensorService: DeviceSensorService,
    private vibrationService: VibrationService,
    private orientationService: OrientationService) {
      this.isLandscape = this.orientationService.isLandscape();
     }

  ngOnInit(): void {

    this.fetchExpectedAngle();
    this.initiateAlignment();
  }

  onBackButtonClick() {
    window.history.back();
  }

  initiateAlignment(): void {
    this.deviceSensorService.requestDeviceOrientationPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          this.deviceSensorService.getDeviceOrientation().subscribe(event => {
            this.angle = event.beta ?? 0;
            if(this.isLightTowardsRight) {
              this.lineStyle1TowardsRight = {
                transform: `rotate(${-14 + this.angle}deg)`
              };
              this.lineStyle2TowardsRight = {
                transform: `rotate(${14 + this.angle}deg)`
              };
              this.angleNumberStyleTowardsRight = {
                transform: `rotate(${this.angle}deg)`
              }
            }
            else{
              this.lineStyle1TowardsLeft = {
                transform: `rotate(${194 + this.angle}deg)`
              };
              this.lineStyle2TowardsLeft = {
                transform: `rotate(${-194 + this.angle}deg)`
              };
              this.angleNumberStyleTowardsLeft = {
                transform: `rotate(${this.angle}deg)`
              }
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
    if(this.isLightTowardsRight) {
      this.lightBeamStyleTowardsRight = {
        transform: `rotate(${this.expectedAngle}deg)`
      }
    }
    else{
      this.lightBeamStyleTowardsLeft = {
        transform: `rotate(${this.expectedAngle}deg)`
      }
    }

  }

  isAngleCorrect(): boolean {
    let isCorrectAngle = Math.abs(this.angle - this.expectedAngle) <= this.tolerance;
    this.isLandscape.subscribe(landscape => {
      if(landscape && isCorrectAngle) {
        this.vibrationService.playSound();
      }
    });
    return isCorrectAngle;
  }

  flipButtonClick(): void {
    this.isLightTowardsRight = !this.isLightTowardsRight;
    this.fetchExpectedAngle();
    this.initiateAlignment();
  }
}
