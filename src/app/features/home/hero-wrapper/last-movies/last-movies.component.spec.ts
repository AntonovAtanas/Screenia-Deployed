import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMoviesComponent } from './last-movies.component';

describe('LastMoviesComponent', () => {
  let component: LastMoviesComponent;
  let fixture: ComponentFixture<LastMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastMoviesComponent]
    });
    fixture = TestBed.createComponent(LastMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
