import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceSensorService {

  constructor() { }

  requestDeviceOrientationPermission(): Promise<string> {
    if ('requestPermission' in DeviceOrientationEvent) {
      return (DeviceOrientationEvent as any).requestPermission();
    } else {
      // Auto-grant permission for non-iOS 13+ devices
      return Promise.resolve('granted');
    }
  }

  getDeviceOrientation(): Observable<DeviceOrientationEvent> {
    return fromEvent<DeviceOrientationEvent>(window, 'deviceorientation');
  }


}
