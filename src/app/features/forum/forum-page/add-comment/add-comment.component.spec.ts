import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { AddCommentComponent } from './add-comment.component';
import { ForumModule } from '../../forum.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ForumService } from 'src/app/services/forum/forum.service';
import { UserService } from 'src/app/services/user/user.service';
import { DebugElement } from '@angular/core';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;
  let el: DebugElement;

  let mockForumService: any;
  let mockUserService: any;

  const spyForumService = jasmine.createSpyObj('ForumService', ['addComment', 'notifyAddedComment']);
  beforeEach(waitForAsync(() => {

    const spyUserService = jasmine.createSpyObj('UserService', ['getUserId', 'getUsername']);

    TestBed.configureTestingModule({
      declarations: [AddCommentComponent],
      imports: [ForumModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: ForumService, useValue: spyForumService},
        {provide: UserService, useValue: spyUserService}
      ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AddCommentComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
  
      mockForumService = TestBed.inject(ForumService);
      mockUserService = TestBed.inject(UserService);
      
      component.postId = '00202022'
      mockUserService.getUserId.and.returnValue('123123123');
  
      fixture.detectChanges();
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation error if no comment is provided', () => {
    // Arrange
    const commentInput: HTMLInputElement = el.nativeElement.querySelector('#comment');
    const submitBtn = el.nativeElement.querySelector('.btn-main');
    // Act
    commentInput.dispatchEvent(new Event('input'));
    commentInput.dispatchEvent(new Event('blur'));
    
    fixture.detectChanges();
    const validationErrorMessage = el.nativeElement.querySelector('#validation-error');
    // Assert
    expect(submitBtn.disabled).toBeTruthy();
    expect(validationErrorMessage.textContent.trim()).toEqual('Comment content is required!');
  });

  it('should show validation error if comment is too short', () => {
    // Arrange
    const commentInput: HTMLInputElement = el.nativeElement.querySelector('#comment');
    const submitBtn = el.nativeElement.querySelector('.btn-main');
    // Act
    commentInput.value = 'test'
    commentInput.dispatchEvent(new Event('input'));
    commentInput.dispatchEvent(new Event('blur'));
    
    fixture.detectChanges();
    const validationErrorMessage = el.nativeElement.querySelector('#validation-error');
    // Assert
    expect(submitBtn.disabled).toBeTruthy();
    expect(validationErrorMessage.textContent.trim()).toEqual('Comment content must be at least 15 characters!');
  });

  it('should show validation error if comment is too long', () => {
    // Arrange
    const commentInput: HTMLInputElement = el.nativeElement.querySelector('#comment');
    const submitBtn = el.nativeElement.querySelector('.btn-main');
    // Act
    commentInput.value = 'testing the comment input testing the comment input testing the comment input testing the comment input testing the comment input testing the comment input testing the comment input testing the comment input'
    commentInput.dispatchEvent(new Event('input'));
    commentInput.dispatchEvent(new Event('blur'));
    
    fixture.detectChanges();
    const validationErrorMessage = el.nativeElement.querySelector('#validation-error');
    // Assert
    expect(submitBtn.disabled).toBeTruthy();
    expect(validationErrorMessage.textContent.trim()).toEqual('Comment content must be no more than 200 characters!');
  });

  it('should activate the button if the comment is valid', () => {
    // Arrange
    const commentInput: HTMLInputElement = el.nativeElement.querySelector('#comment');
    const submitBtn = el.nativeElement.querySelector('.btn-main');
    // Act
    commentInput.value = 'testing the comment input'
    commentInput.dispatchEvent(new Event('input'));
    commentInput.dispatchEvent(new Event('blur'));
    
    fixture.detectChanges();
    const validationErrorMessage = el.nativeElement.querySelector('#validation-error');
    // Assert
    expect(submitBtn.disabled).toBeFalsy();
    expect(validationErrorMessage).toBeFalsy();
  });

  it('submit the comment successfully', () => {
    // Arrange
    const commentInput: HTMLInputElement = el.nativeElement.querySelector('#comment');
    const submitBtn = el.nativeElement.querySelector('.btn-main');
    const onCommentSpy = spyOn(component, 'onComment')
    // Act
    commentInput.value = 'testing the comment input'
    commentInput.dispatchEvent(new Event('input'));
    commentInput.dispatchEvent(new Event('blur'));

    submitBtn.click();
    fixture.detectChanges();
    // Assert
    expect(onCommentSpy).toHaveBeenCalled();
  });

  it('submit the comment successfully', fakeAsync(() => {
    // Arrange
    const commentInput: HTMLInputElement = el.nativeElement.querySelector('#comment');

    // Act
    commentInput.value = 'testing the comment input'
    commentInput.dispatchEvent(new Event('input'));
    commentInput.dispatchEvent(new Event('blur'));

    const mockForm = <any>{
      value: {
        comment: commentInput.value
      },
      reset: () => null
    }

    mockUserService.getUsername.and.returnValue('testUsername');
    mockForumService.addComment.and.returnValue(of({comment: 'testing the comment input', createdAt: '2023-08-12T15:34:02.954+00:00'}));

    const mockCommentResponse = {comment: 'testing the comment input', createdAt: '2023-08-12T15:34:02.954+00:00'}
    const username = 'testUsername';

    tick()
    component.onComment(mockForm);
    tick();
    fixture.detectChanges();  
    // Assert
    expect(spyForumService.notifyAddedComment).toHaveBeenCalledWith({...mockCommentResponse, userId: {username}})
  }));
});
