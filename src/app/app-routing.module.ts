import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'user', loadChildren: () => import('./features/users/user.module').then(module => module.UserModule)},
  {path: 'movies', loadChildren: () => import('./features/movies/movies.module').then(module => module.MoviesModule)},
  {path: 'forum', loadChildren: () => import('./features/forum/forum.module').then(module => module.ForumModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
