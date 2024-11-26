import { Component } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../types/model/post.type';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  posts: Post[] = [];
  userId: number | null = null;

  constructor(
    private postService: PostService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });

   this.userId = this.userService.getUserId();
  }

  onLike(postId: number): void {
    this.postService.likePost(postId).subscribe(() => {
      this.posts = this.posts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      );
    });
  }

  onAddComment(postId: number, commentContent: string): void {
    const newComment = {
      id: new Date().getTime(),
      userId: this.userId,
      content: commentContent,
      createdAt: new Date()
    };
    this.postService.addComment(postId, newComment).subscribe(() => {
      this.posts = this.posts.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      );
    });
  }

}
