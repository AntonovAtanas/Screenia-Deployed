import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumPageComponent } from './forum-page/forum-page.component';
import { AddPostComponent } from './forum-page/add-post/add-post.component';
import { PostDetailsComponent } from './forum-page/post-details/post-details.component';
import { AuthGuardGuestService } from 'src/app/services/auth/auth-guard-guest.service';

const routes: Routes = [
    {path: '', component: ForumPageComponent},
    {path: 'post/add', canActivate: [AuthGuardGuestService], component: AddPostComponent},
    {path: 'post/:id', canActivate: [AuthGuardGuestService], component: PostDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
