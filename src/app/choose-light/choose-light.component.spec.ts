import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLightComponent } from './choose-light.component';

describe('ChooseLightComponent', () => {
  let component: ChooseLightComponent;
  let fixture: ComponentFixture<ChooseLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseLightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
