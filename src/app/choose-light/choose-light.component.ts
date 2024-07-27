import { Component } from '@angular/core';
import { Lights } from '../constants/app-data';
import { Light } from '../models/light';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-light',
  templateUrl: './choose-light.component.html',
  styleUrl: './choose-light.component.scss'
})
export class ChooseLightComponent {

  lights = Lights;

  constructor(private route: Router) { }

  chooseLight(light: Light){
    this.route.navigate(['/choose-light-type', light.serie]);
  }

}
