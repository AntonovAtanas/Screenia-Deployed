import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroWrapperComponent } from './hero-wrapper.component';

describe('HeroWrapperComponent', () => {
  let component: HeroWrapperComponent;
  let fixture: ComponentFixture<HeroWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroWrapperComponent]
    });
    fixture = TestBed.createComponent(HeroWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
