import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ForumService } from 'src/app/services/forum/forum.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnDestroy, OnInit {

  addPostSubsription$!: Subscription;

  error: string = '';
  userId: string = '';

  constructor(private forumService: ForumService, private router: Router, private userService: UserService){}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
  }

  onCreate(postForm: NgForm){
    this.addPostSubsription$ = this.forumService.addPost({...postForm.value, _ownerId: this.userId}).subscribe({
      next: () => this.router.navigate(['/forum']),
      error: (error) => this.error = error.message
    })
  };

  ngOnDestroy(): void {
    if (this.addPostSubsription$ !== undefined) {
      this.addPostSubsription$.unsubscribe();
    }
  }
}
