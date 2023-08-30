import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { AddPostComponent } from './add-post.component';
import { ForumModule } from '../../forum.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ForumService } from 'src/app/services/forum/forum.service';
import { UserService } from 'src/app/services/user/user.service';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let el: DebugElement;

  let mockUserService: any;
  let mockForumService: any;
  let router: Router;

  beforeEach(waitForAsync(() => {

    let forumServiceSpy = jasmine.createSpyObj('ForumService', ['addPost']);
    let userServiceSpy = jasmine.createSpyObj('UserService', ['getUserId']);


    TestBed.configureTestingModule({
      declarations: [AddPostComponent],
      imports: [ForumModule, HttpClientTestingModule],
      providers: [
        {provide: ForumService, useValue: forumServiceSpy},
        {provide: UserService, useValue: userServiceSpy},
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AddPostComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        mockUserService = TestBed.inject(UserService);
        mockForumService = TestBed.inject(ForumService);
        router = TestBed.inject(Router)

        // get mock user id upon oninit
        mockUserService.getUserId.and.returnValue('123123123');
          
        fixture.detectChanges();
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new comment successfully', fakeAsync(() => {
    // Arrange
    const titleInput = el.nativeElement.querySelector('#title');
    const descriptionInput = el.nativeElement.querySelector('#description');

    const navigateSpy = spyOn(router, 'navigate');

    // Act
    titleInput.value = 'Test new post';
    titleInput.dispatchEvent(new Event('input'));
    titleInput.dispatchEvent(new Event('blur'));

    descriptionInput.value = 'Test new post description';
    descriptionInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    const mockForm = <NgForm>{
      value: {
        title: titleInput.value,
        description: descriptionInput.value
      }
    };

    mockForumService.addPost.and.returnValue(of('test'));
    // tick()

    component.onCreate(mockForm);


    // Assert
    expect(mockForumService.addPost).toHaveBeenCalledWith({...mockForm.value, _ownerId: component.userId});
    expect(navigateSpy).toHaveBeenCalledWith(['/forum']);
  }));

  it('should show error when there are non filled inputs', () => {
    // Arrange
    const titleInput = el.nativeElement.querySelector('#title');
    const descriptionInput = el.nativeElement.querySelector('#description');
    // Act
    titleInput.dispatchEvent(new Event('input'));
    titleInput.dispatchEvent(new Event('blur'));
    
    descriptionInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('blur'));
    
    fixture.detectChanges();
    
    const validationErrors = el.nativeElement.querySelectorAll('#validation-error');
    // Assert
    expect(validationErrors[0].textContent.trim()).toEqual('Post title is required!');
    expect(validationErrors[1].textContent.trim()).toEqual('Post description is required!');
  });

  it('should show error when there are too few characters', () => {
    // Arrange
    const titleInput = el.nativeElement.querySelector('#title');
    const descriptionInput = el.nativeElement.querySelector('#description');
    // Act
    titleInput.value = 'Tes';
    titleInput.dispatchEvent(new Event('input'));
    titleInput.dispatchEvent(new Event('blur'));
    
    descriptionInput.value = 'Testing';
    descriptionInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('blur'));
    
    fixture.detectChanges();
    
    const validationErrors = el.nativeElement.querySelectorAll('#validation-error');
    // Assert
    expect(validationErrors[0].textContent.trim()).toEqual('Post title is less than 4 characters!');
    expect(validationErrors[1].textContent.trim()).toEqual('Post description should be minimum 20 characters.');
  });

  it('should show error when there are too many characters', () => {
    // Arrange
    const titleInput = el.nativeElement.querySelector('#title');
    const descriptionInput = el.nativeElement.querySelector('#description');
    // Act
    titleInput.value = 'Test Test Test Test Test Test Test Test Test Test Test Test Test ';
    titleInput.dispatchEvent(new Event('input'));
    titleInput.dispatchEvent(new Event('blur'));
    
    descriptionInput.value = 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test ';
    descriptionInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('blur'));
    
    fixture.detectChanges();
    
    const validationErrors = el.nativeElement.querySelectorAll('#validation-error');
    // Assert
    expect(validationErrors[0].textContent.trim()).toEqual('Post title should not exceed 60 characters!');
    expect(validationErrors[1].textContent.trim()).toEqual('Post description should be maximum 200 characters.');
  });
});
