import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LastPostsComponent } from './last-posts.component';
import { HomeModule } from '../home.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForumService } from 'src/app/services/forum/forum.service';
import { DebugElement } from '@angular/core';
import { Post } from 'src/app/interfaces/Post';
import { of } from 'rxjs';

describe('LastPostsComponent', () => {
  let component: LastPostsComponent;
  let fixture: ComponentFixture<LastPostsComponent>;
  let el: DebugElement;

  let mockForumService: any;

  const lastThreePosts: Post[] = [
    {
      title: 'Post 1',
      description: 'Description to post 1',
      _id: '010101',
      createdAt: '2023-08-12T15:34:02.954+00:00'
    },
    {
      title: 'Post 2',
      description: 'Description to post 2',
      _id: '020202',
      createdAt: '2023-08-12T17:34:02.954+00:00'
    },
    {
      title: 'Post 3',
      description: 'Description to post 3',
      _id: '030303',
      createdAt: '2023-08-12T16:34:02.954+00:00'
    }
  ]

  beforeEach(waitForAsync(() => {
    let forumServiceSpy = jasmine.createSpyObj('ForumService', [
      'getLastThreePosts',
    ]);

    TestBed.configureTestingModule({
      declarations: [LastPostsComponent],
      imports: [HomeModule, HttpClientTestingModule],
      providers: [{ provide: ForumService, useValue: forumServiceSpy }],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LastPostsComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        mockForumService = TestBed.inject(ForumService);
        mockForumService.getLastThreePosts.and.returnValue(of(lastThreePosts));

        fixture.detectChanges();
      })

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the last 3 posts', () => {
    // Arrange
    const lastPostsWrapper = el.nativeElement.querySelector('.last-posts-wrapper');
    const lastPosts = el.nativeElement.querySelectorAll('.last-posts-card-title');
    // Act
    // Assert
    expect(lastPostsWrapper.children.length).toEqual(lastThreePosts.length);
    expect(lastPosts[0].textContent).toEqual(lastThreePosts[0].title);
    expect(lastPosts[1].textContent).toEqual(lastThreePosts[1].title);
    expect(lastPosts[2].textContent).toEqual(lastThreePosts[2].title);
  });
});
