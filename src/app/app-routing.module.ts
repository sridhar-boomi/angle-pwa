import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChooseLightComponent } from './choose-light/choose-light.component';
import { ChooseLightTypeComponent } from './choose-light-type/choose-light-type.component';
import { PreparationComponent } from './preparation/preparation.component';
import { AlignmentComponent } from './alignment/alignment.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: ''
  },
  {
    component: HomeComponent,
    path: 'home'
  },
  {
    component: ChooseLightComponent,
    path: 'choose-light'
  },
  {
    component: ChooseLightTypeComponent,
    path: 'choose-light-type/:serie'
  },
  {
    component: PreparationComponent,
    path: 'preparation/:serie/:lightType'
  },
  {
    component: AlignmentComponent,
    path: 'alignment'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
