import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ForumService } from 'src/app/services/forum/forum.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit, OnDestroy {
  addCommentSubscription$!: Subscription;

  postId: string = '';
  userId: string = '';
  error: string = '';

  constructor(private forumService: ForumService, private activatedRoute: ActivatedRoute, private userService: UserService){}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.postId = this.activatedRoute.snapshot.params['id'];
  }

  onComment(commentForm: NgForm) {
    if (commentForm.invalid){
      return
    };

    this.addCommentSubscription$ = this.forumService.addComment({...commentForm.value, userId: this.userId}, this.postId).subscribe({
      next: (comment) => {
        this.forumService.notifyAddedComment(comment)
        commentForm.reset();
      },
      error: (error) => this.error = error.message
    })
  }

  ngOnDestroy(): void {
    if (this.addCommentSubscription$ !== undefined) {
      this.addCommentSubscription$.unsubscribe();
    }
  }
}
