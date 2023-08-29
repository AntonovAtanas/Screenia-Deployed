import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPostsComponent } from './all-posts.component';
import { ForumModule } from '../../forum.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AllPostsComponent', () => {
  let component: AllPostsComponent;
  let fixture: ComponentFixture<AllPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPostsComponent],
      imports: [ForumModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(AllPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
