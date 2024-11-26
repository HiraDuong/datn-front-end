import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../types/model/post.type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post!: Post;
  @Output() like = new EventEmitter<void>();
  @Output() addComment = new EventEmitter<string>();

  commentContent: string = '';

  onLike(): void {
    this.like.emit();
  }

  onAddComment(): void {
    if (this.commentContent.trim()) {
      this.addComment.emit(this.commentContent);
      this.commentContent = ''; // Clear the input field
    }
  }

}
