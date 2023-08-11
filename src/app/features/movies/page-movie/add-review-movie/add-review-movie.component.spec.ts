import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewMovieComponent } from './add-review-movie.component';

describe('AddReviewMovieComponent', () => {
  let component: AddReviewMovieComponent;
  let fixture: ComponentFixture<AddReviewMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReviewMovieComponent]
    });
    fixture = TestBed.createComponent(AddReviewMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
