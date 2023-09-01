import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPageComponent } from './forum-page.component';
import { ForumModule } from '../forum.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ForumPageComponent', () => {
  let component: ForumPageComponent;
  let fixture: ComponentFixture<ForumPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForumPageComponent],
      imports: [ForumModule, RouterTestingModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ForumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show add post button', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('.btn-main');

    expect(btn).toBeTruthy();
    expect(btn.textContent).toEqual('Add post');
  });
});
