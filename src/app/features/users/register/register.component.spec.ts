import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { UserModule } from '../user.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;  
  let el: DebugElement;
  let mockUserService: any;
  let mockAuthService: any;
  let router: Router;

  beforeEach(waitForAsync(() => {

    let userServiceSpy = jasmine.createSpyObj('UserService', ['register', 'notifyUserAuth']);
    let authServiceSpy = jasmine.createSpyObj('AuthService', ['setUserData']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [UserModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegisterComponent);
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
    const rePasswordInput: HTMLInputElement = el.nativeElement.querySelector('#rePassword');

    const submitBtn = el.nativeElement.querySelector('.btn-main');
    // Act
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));

    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));

    rePasswordInput.dispatchEvent(new Event('input'));
    rePasswordInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    const errorMessage = el.nativeElement.querySelectorAll('#validation-error');
    // Assert
    expect(errorMessage.length).toEqual(3);
    expect(errorMessage[0].textContent.trim()).toEqual('Username is required!');
    expect(errorMessage[1].textContent.trim()).toEqual('Password is required!');
    expect(errorMessage[2].textContent.trim()).toEqual('Password is required!');
    expect(submitBtn.disabled).toBeTrue();
  });

  it('should show validaton error if the inputs are too short', () => {
    // Arrange
    const usernameInput: HTMLInputElement = el.nativeElement.querySelector('#username');
    const passwordInput: HTMLInputElement = el.nativeElement.querySelector('#password');
    const rePasswordInput: HTMLInputElement = el.nativeElement.querySelector('#rePassword');

    const submitBtn = el.nativeElement.querySelector('.btn-main');
    // Act
    usernameInput.value = 'D';
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));

    passwordInput.value = 'D';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));

    rePasswordInput.value = 's';
    rePasswordInput.dispatchEvent(new Event('input'));
    rePasswordInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    const errorMessage = el.nativeElement.querySelectorAll('#validation-error');
    // Assert
    expect(errorMessage.length).toEqual(3);
    expect(errorMessage[0].textContent.trim()).toEqual('Username is less than 5 symbols!');
    expect(errorMessage[1].textContent.trim()).toEqual('Password is less than 5 symbols!');
    expect(errorMessage[2].textContent.trim()).toEqual('Passwords do not match!');
    expect(submitBtn.disabled).toBeTrue();
  });

  it('should submit the form correctly & call onLogin method', () => {
    // Arrange
    const usernameInput: HTMLInputElement = el.nativeElement.querySelector('#username');
    const passwordInput: HTMLInputElement = el.nativeElement.querySelector('#password');
    const rePasswordInput: HTMLInputElement = el.nativeElement.querySelector('#rePassword');
    const submitBtn = el.nativeElement.querySelector('.btn-main');

    const onRegisterSpy = spyOn(component, 'onRegister');
    // Act
    usernameInput.value = 'TestUser';
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));

    passwordInput.value = '123123';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));

    rePasswordInput.value = '123123';
    rePasswordInput.dispatchEvent(new Event('input'));
    rePasswordInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    submitBtn.click();

    // Assert
    expect(submitBtn.disabled).toBeFalse();
    expect(onRegisterSpy).toHaveBeenCalled();
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
    mockUserService.register.and.returnValue(of(mockForm));
    component.onRegister(mockForm);

    // Assert
    expect(routerSpy).toHaveBeenCalledWith(['/']);
    expect(mockUserService.notifyUserAuth).toHaveBeenCalledWith(true);
    expect(mockAuthService.setUserData).toHaveBeenCalledWith(mockForm);
  });
});
