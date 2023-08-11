import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMovieComponent } from './top-movie.component';

describe('TopMovieComponent', () => {
  let component: TopMovieComponent;
  let fixture: ComponentFixture<TopMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopMovieComponent]
    });
    fixture = TestBed.createComponent(TopMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
