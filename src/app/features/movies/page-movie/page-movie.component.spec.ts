import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMovieComponent } from './page-movie.component';
import { MoviesModule } from '../movies.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

describe('PageMovieComponent', () => {
  let component: PageMovieComponent;
  let fixture: ComponentFixture<PageMovieComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageMovieComponent],
      imports: [MoviesModule, HttpClientTestingModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(PageMovieComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 children', () => {
    // Arrange
    const children = el.nativeElement.querySelector('.movie-detais-wrapper').children;
    // Act
    
    // Assert
    expect(children.length).toEqual(3);
  })
});
