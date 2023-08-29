import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCommentsComponent } from './all-comments.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForumModule } from '../../forum.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AllCommentsComponent', () => {
  let component: AllCommentsComponent;
  let fixture: ComponentFixture<AllCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCommentsComponent],
      imports: [HttpClientTestingModule, ForumModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(AllCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
