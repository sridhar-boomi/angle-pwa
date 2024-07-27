import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LightType } from '../models/light';
import { Lights } from '../constants/app-data';

@Component({
  selector: 'app-choose-light-type',
  templateUrl: './choose-light-type.component.html',
  styleUrl: './choose-light-type.component.scss'
})
export class ChooseLightTypeComponent {
  serie: string = '';
  lights = Lights;
  lightTypes: LightType[]=[];


  constructor(private activatedRoute: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
    const serie = this.activatedRoute.snapshot.paramMap.get('serie');
    if (serie !== null) {
      this.serie = serie;
      this.lights.forEach(light => {
        if (light.serie === serie) {
          this.lightTypes = light.types;
        }
      });
    }
  }

  chooseLightType(lightType: LightType) {
    this.route.navigate(['/preparation', this.serie, lightType.name]);
  }
}
