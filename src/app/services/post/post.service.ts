import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../../types/model/post.type';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [
    {
      id: 1,
      userId: 1,
      content: "This is a post about Angular!",
      createdAt: new Date(),
      likes: 10,
      comments: [
        { id: 1, userId: 2, content: "Great post!", createdAt: new Date() },
        { id: 2, userId: 3, content: "I love Angular too!", createdAt: new Date() }
      ]
    },
    // Add more posts here...
  ];

  constructor() { }

  getPosts(): Observable<Post[]> {
    return of(this.posts);
  }

  likePost(postId: number): Observable<void> {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.likes++;
    }
    return of();
  }

  addComment(postId: number, comment: any): Observable<void> {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.comments.push(comment);
    }
    return of();
  }
}
