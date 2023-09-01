import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { ForumModule } from '../../forum.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ForumService } from 'src/app/services/forum/forum.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { Post } from 'src/app/interfaces/Post';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let el: DebugElement;

  let mockAuthService: any;
  let mockForumService: any;

  const post: Post = {
    title: 'Post 1',
    description: 'Post 1 description',
    _id: '8287723',
    _ownerId: {
      username: 'post1owner'
    },
    createdAt: '2023-08-12T15:34:02.954+00:00'
  };

  const comments = [
    {
      userId: {
        username: 'User1'
      },
      createdAt: '2023-08-12T15:33:02.954+00:00',
      comment: 'testing comment description 1'
    },
    {
      userId: {
        username: 'User2'
      },
      createdAt: '2023-08-12T15:34:02.954+00:00',
      comment: 'testing comment description 2'
    },
  ]

  beforeEach(waitForAsync(() => {

    let authServiceSpy = jasmine.createSpyObj('AuthService', ['isLogged']);
    let forumServiceSpy = jasmine.createSpyObj('ForumService', ['getForumPost', 'getAllComments', 'commentAdded$']);

    TestBed.configureTestingModule({
      declarations: [PostDetailsComponent],
      imports: [ForumModule, HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        {provide: ForumService, useValue: forumServiceSpy},
        {provide: AuthService, useValue: authServiceSpy}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PostDetailsComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        mockAuthService = TestBed.inject(AuthService);
        mockForumService = TestBed.inject(ForumService);

        mockAuthService.isLogged.and.returnValue(true);
        mockForumService.getForumPost.and.returnValue(of(post));
        mockForumService.getAllComments.and.returnValue(of(comments));
        mockForumService.commentAdded$ = new BehaviorSubject<any>(null).asObservable();

        fixture.detectChanges();
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the post correctly', () => {
    // Arrange
    const renderedPost = el.nativeElement.querySelector('.blog-container');
    const postTitle = el.nativeElement.querySelector('h1')
    // Act

    // Assert
    expect(renderedPost).toBeTruthy;
    expect(postTitle.textContent).toEqual(post.title);
    expect(component.isLoading).toEqual(false);
  });

  it('should say to log in if user is not logged', () => {
    // Arrange
    component.isLogged = false;
    fixture.detectChanges();

    const message = el.nativeElement.querySelectorAll('.hero-top-movie')[1];
    // Act

    // Assert
    expect(message.textContent).toEqual('Log in to comment');
  });

  it('should appear add comment if user is logged', () => {
    // Arrange
    component.isLogged = true;
    fixture.detectChanges();

    const message = el.nativeElement.querySelectorAll('.hero-top-movie')[1];
    // Act
    // Assert
    expect(message.textContent).toEqual('Add comment');
  });
});
