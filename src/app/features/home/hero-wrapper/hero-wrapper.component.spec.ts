import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroWrapperComponent } from './hero-wrapper.component';
import { HomeModule } from '../home.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeroWrapperComponent', () => {
  let component: HeroWrapperComponent;
  let fixture: ComponentFixture<HeroWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroWrapperComponent],
      imports: [HomeModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(HeroWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 2 elements', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.hero-wrapper').children.length).toEqual(2)
  })
});
