export interface Post {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  userId: number | null;
  content: string;
  createdAt: Date;
}
