import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/Post';
import { ForumService } from 'src/app/services/forum/forum.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnDestroy {
  allPostsSubscription$!: Subscription;

  allPosts: Post[] = [];

  error: string = '';
  
  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.allPostsSubscription$ = this.forumService.getAllPosts().subscribe({
      next: (allPosts) => {
        this.allPosts = allPosts;
      },
      error: (error) => this.error = error.message
    })
  };

  ngOnDestroy(): void {
    if (this.allPostsSubscription$ !== undefined) {
      this.allPostsSubscription$.unsubscribe();
    }
  }
}
