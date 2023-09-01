import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllCommentsComponent } from './all-comments.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForumModule } from '../../forum.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ForumService } from 'src/app/services/forum/forum.service';
import { DebugElement } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AllCommentsComponent', () => {
  let component: AllCommentsComponent;
  let fixture: ComponentFixture<AllCommentsComponent>;
  let el: DebugElement;

  const mockComments = [
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
  ];

  let mockForumService: any;

  beforeEach(waitForAsync(() => {

    let forumServiceSpy = jasmine.createSpyObj('ForumService', ['getAllComments', 'commentAdded$']);


    TestBed.configureTestingModule({
      declarations: [AllCommentsComponent],
      imports: [HttpClientTestingModule, ForumModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        [
          {provide: ForumService, useValue: forumServiceSpy}
        ]
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AllCommentsComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        mockForumService = TestBed.inject(ForumService);
        mockForumService.getAllComments.and.returnValue(of(mockComments));
        mockForumService.commentAdded$ = new BehaviorSubject<any>(null).asObservable();
        
        fixture.detectChanges();
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 2 comments correctly', () => {
    // Arrange
    const comments = el.nativeElement.querySelectorAll('.review');
    const commentTitle = el.nativeElement.querySelectorAll('.review-content')[1];
    // Act

    // Assert

    expect(comments.length).toEqual(mockComments.length);
    expect(commentTitle.textContent.trim()).toEqual(mockComments[1].comment);
  });

  it('should show message if there are no comments yet', () => {
    // Arrange
    component.allComments = [];
    fixture.detectChanges();

    const message = el.nativeElement.querySelector('.hero-top-movie');
    // Act

    // Assert
    expect(message.textContent.trim()).toEqual('No comments yet');
  });
});
