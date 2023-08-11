import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/Post';
import { ForumService } from 'src/app/services/forum/forum.service';
import { DateAgoPipe } from 'src/app/shared/custom-pipes/date-ago.pipe';

@Component({
  selector: 'app-last-posts',
  templateUrl: './last-posts.component.html',
  styleUrls: ['./last-posts.component.css'],
  providers: [DateAgoPipe]
})
export class LastPostsComponent implements OnInit, OnDestroy {
  lastPostsSubscription$!: Subscription;
  lastPosts: Post[] = [];
  error: string = '';

  constructor(private forumService: ForumService){};

  ngOnInit(): void {
    this.lastPostsSubscription$ = this.forumService.getLastThreePosts().subscribe({
      next: (posts) => this.lastPosts = posts,
      error: (response) => this.error = response.message
    })
  }

  ngOnDestroy(): void {
    if (this.lastPostsSubscription$ !== undefined) {
      this.lastPostsSubscription$.unsubscribe();
    }
  }

}
