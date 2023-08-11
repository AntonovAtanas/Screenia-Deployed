import { animate, style, transition, trigger, state } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ForumService } from 'src/app/services/forum/forum.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css'],
  animations: [
    trigger('comment1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0.3,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ])
      
    ])
  ]
})
export class AllCommentsComponent implements OnInit, OnDestroy {
  getAllComments$!: Subscription;
  commentSubscription$!: Subscription;

  allComments: any = [];

  postId: string = '';
  error: string = '';
  
  constructor(private forumService: ForumService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.commentAddedListener();
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.getAllComments$ = this.forumService.getAllComments(this.postId).subscribe({
      next: (comments) => this.allComments = comments,
      error: (error) => this.error = error.message
    })
  };

  commentAddedListener(){
    this.commentSubscription$ = this.forumService.commentAdded$.subscribe({
      next: (comment) => {
        if (comment) {
          this.allComments.push(comment);
        }
      }
    })
  }

  ngOnDestroy(): void {
    if (this.getAllComments$ !== undefined) {
      this.getAllComments$.unsubscribe();
    }
  }

}
