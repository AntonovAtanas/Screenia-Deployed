import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllPostsComponent } from './all-posts.component';
import { ForumModule } from '../../forum.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForumService } from 'src/app/services/forum/forum.service';
import { Post } from 'src/app/interfaces/Post';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AllPostsComponent', () => {
  let component: AllPostsComponent;
  let fixture: ComponentFixture<AllPostsComponent>;
  let el: DebugElement;

  let mockForumService: any;

  const mockPosts: Post[] = [
    {
      title: 'Post 1',
      description: 'Post 1 description',
      _id: '111111',
      _ownerId: '010101',
      createdAt: '2023-08-12T15:34:02.954+00:00'
    },
    {
      title: 'Post 2',
      description: 'Post 2 description',
      _id: '222222',
      _ownerId: '0202002',
      createdAt: '2023-08-12T16:34:02.954+00:00'
    }
  ]

  beforeEach(waitForAsync(() => {

    const forumServiceSpy = jasmine.createSpyObj('ForumService', ['getAllPosts']);

    TestBed.configureTestingModule({
      declarations: [AllPostsComponent],
      imports: [ForumModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: ForumService, useValue: forumServiceSpy}
      ]
    }).compileComponents()
      .then(() => {
      fixture = TestBed.createComponent(AllPostsComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;

      mockForumService = TestBed.inject(ForumService);
      mockForumService.getAllPosts.and.returnValue(of(mockPosts));

      fixture.detectChanges();
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all posts' , () => {
    // Arrange
    const posts = el.nativeElement.querySelectorAll('.post-link');
    const postsTitles = el.nativeElement.querySelectorAll('.card__title')
    // Act
    
    // Assert
    expect(component.isLoading).toEqual(false);
    expect(postsTitles[1].textContent).toEqual(mockPosts[1].title);
    expect(posts.length).toEqual(2);
  })
});
