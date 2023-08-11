import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './forum-page/all-posts/all-posts.component';
import { ForumRoutingModule } from './forum-routing.module';
import { FormsModule } from '@angular/forms';
import { ForumPageComponent } from './forum-page/forum-page.component';
import { AddPostComponent } from './forum-page/add-post/add-post.component';
import { PostDetailsComponent } from './forum-page/post-details/post-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCommentComponent } from './forum-page/add-comment/add-comment.component';
import { AllCommentsComponent } from './forum-page/all-comments/all-comments.component';



@NgModule({
  declarations: [
    AllPostsComponent,
    AddPostComponent,
    ForumPageComponent,
    PostDetailsComponent,
    AddCommentComponent,
    AllCommentsComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ForumModule { }
