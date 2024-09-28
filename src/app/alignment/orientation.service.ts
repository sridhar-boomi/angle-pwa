import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {
  private isLandscapeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private ngZone: NgZone) {
    this.checkOrientation();
    window.addEventListener('resize', this.checkOrientation.bind(this));
  }

  private checkOrientation() {
    this.ngZone.run(() => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      this.isLandscapeSubject.next(isLandscape);
    });
  }

  public isLandscape(): Observable<boolean> {
    return this.isLandscapeSubject.asObservable();
  }
}
