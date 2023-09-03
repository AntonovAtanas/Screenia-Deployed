import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserModule } from '../user.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DebugElement } from '@angular/core';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let mockUserService: any;
  let mockAuthService: any;
  let router: Router;

  beforeEach(waitForAsync(() => {

    let userServiceSpy = jasmine.createSpyObj('UserService', ['login', 'notifyUserAuth']);
    let authServiceSpy = jasmine.createSpyObj('AuthService', ['setUserData']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [UserModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
      ]
    }).compileComponents()
    .then(()=> {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
  
      mockUserService = TestBed.inject(UserService);
      mockAuthService = TestBed.inject(AuthService);
      router = TestBed.inject(Router);
  
      fixture.detectChanges();
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validaton error if the inputs are not filled', () => {
    // Arrange
    const usernameInput: HTMLInputElement = el.nativeElement.querySelector('#username');
    const passwordInput: HTMLInputElement = el.nativeElement.querySelector('#password');
    const submitBtn = el.nativeElement.querySelector('.btn-main');
    // Act
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));

    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    const errorMessage = el.nativeElement.querySelectorAll('#validation-error');
    // Assert
    expect(errorMessage.length).toEqual(2);
    expect(errorMessage[0].textContent.trim()).toEqual('Username is required!');
    expect(errorMessage[1].textContent.trim()).toEqual('Password is required!')
    expect(submitBtn.disabled).toBeTrue();
  });

  it('should show validaton error if the inputs are too short', () => {
    // Arrange
    const usernameInput: HTMLInputElement = el.nativeElement.querySelector('#username');
    const passwordInput: HTMLInputElement = el.nativeElement.querySelector('#password');
    const submitBtn = el.nativeElement.querySelector('.btn-main');
    // Act
    usernameInput.value = 'D';
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));

    passwordInput.value = 'D';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    const errorMessage = el.nativeElement.querySelectorAll('#validation-error');
    // Assert
    expect(errorMessage.length).toEqual(2);
    expect(errorMessage[0].textContent.trim()).toEqual('Username is less than 5 symbols!');
    expect(errorMessage[1].textContent.trim()).toEqual('Password is less than 5 symbols!')
    expect(submitBtn.disabled).toBeTrue();
  });

  it('should submit the form correctly & call onLogin method', () => {
    // Arrange
    const usernameInput: HTMLInputElement = el.nativeElement.querySelector('#username');
    const passwordInput: HTMLInputElement = el.nativeElement.querySelector('#password');
    const submitBtn = el.nativeElement.querySelector('.btn-main');

    const onLoginSpy = spyOn(component, 'onLogin');
    // Act
    usernameInput.value = 'testUser';
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));

    passwordInput.value = '123456';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    submitBtn.click();

    // Assert
    expect(submitBtn.disabled).toBeFalse();
    expect(onLoginSpy).toHaveBeenCalled();
  });

  it('should submit the form correctly with the form data', () => {
    // Arrange
    const routerSpy = spyOn(router, 'navigate');

    let mockForm = <NgForm>{
      value: {
        username: 'testuser',
        password: '123123'
      }
    };

    // Act
    mockUserService.login.and.returnValue(of(mockForm));
    component.onLogin(mockForm);

    // Assert
    expect(routerSpy).toHaveBeenCalledWith(['/']);
  });
});
