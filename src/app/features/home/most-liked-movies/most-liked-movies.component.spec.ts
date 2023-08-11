import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostLikedMoviesComponent } from './most-liked-movies.component';

describe('MostLikedMoviesComponent', () => {
  let component: MostLikedMoviesComponent;
  let fixture: ComponentFixture<MostLikedMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostLikedMoviesComponent]
    });
    fixture = TestBed.createComponent(MostLikedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
