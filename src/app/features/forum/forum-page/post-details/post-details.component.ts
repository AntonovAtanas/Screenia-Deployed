import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/Post';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ForumService } from 'src/app/services/forum/forum.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  getPostSubscription$!: Subscription;
  post!: Post;
  isLoading: boolean = false;
  isLogged: boolean = false;

  postId: string = '';
  error: string = '';

  constructor(
    private forumService: ForumService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLogged();
    this.isLoading = true;
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.getPostSubscription$ = this.forumService
      .getForumPost(this.postId)
      .subscribe({
        next: (post) => {
          this.post = post;
          this.isLoading = false;
        },
        error: (response) => (this.error = response.message),
      });
  }

  ngOnDestroy(): void {
    if (this.getPostSubscription$ !== undefined) {
      this.getPostSubscription$.unsubscribe();
    }
  }
}
