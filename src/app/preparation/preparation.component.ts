import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lights } from '../constants/app-data';
import { LightType } from '../models/light';

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrl: './preparation.component.scss'
})
export class PreparationComponent {
  serie: string = '';
  lightType: string = '';
  lights = Lights;

  constructor(private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    const serie = this.activatedRoute.snapshot.paramMap.get('serie');
    if (serie !== null) {
      this.serie = serie;
    }
    const lightType = this.activatedRoute.snapshot.paramMap.get('lightType');
    if (lightType !== null) {
      this.lightType = lightType;
    }
  }
  startAlignment(){
    this.route.navigate(['/alignment', this.serie, this.lightType]);
  }
}
