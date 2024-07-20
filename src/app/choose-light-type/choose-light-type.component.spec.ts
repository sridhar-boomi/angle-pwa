import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLightTypeComponent } from './choose-light-type.component';

describe('ChooseLightTypeComponent', () => {
  let component: ChooseLightTypeComponent;
  let fixture: ComponentFixture<ChooseLightTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseLightTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseLightTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
