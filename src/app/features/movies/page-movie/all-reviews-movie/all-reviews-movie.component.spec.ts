import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReviewsMovieComponent } from './all-reviews-movie.component';

describe('AllReviewsMovieComponent', () => {
  let component: AllReviewsMovieComponent;
  let fixture: ComponentFixture<AllReviewsMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllReviewsMovieComponent]
    });
    fixture = TestBed.createComponent(AllReviewsMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
