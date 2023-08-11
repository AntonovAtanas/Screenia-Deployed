import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/Post';
import { ENDPOINT } from 'src/app/environments/endpoints';

@Injectable({
  providedIn: 'root'
})

export class ForumService {
  private commentAddedSubject = new BehaviorSubject<any>(null);
  commentAdded$ = this.commentAddedSubject.asObservable();

  constructor(private http: HttpClient) { }

  addPost(postData: Post){
    // return this.http.post('http://localhost:3000/forum/add', postData);
    return this.http.post(`${ENDPOINT.forum}/add`, postData);
  };

  getAllPosts(){
    return this.http.get<Post[]>(`${ENDPOINT.forum}/all`);
  };

  getLastThreePosts(){
    return this.http.get<Post[]>(`${ENDPOINT.forum}`);
  };

  getForumPost(postId: string){
    return this.http.get<Post>(`${ENDPOINT.forum}/post/${postId}`);
  };

  addComment(commentData: Comment, postId: string){
    return this.http.post<Comment>(`${ENDPOINT.forum}/post/${postId}/comment`, commentData);
  };

  getAllComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${ENDPOINT.forum}/post/${postId}/comment`);
  };

  notifyAddedComment(commentData: any){
    this.commentAddedSubject.next(commentData)
  };
}

