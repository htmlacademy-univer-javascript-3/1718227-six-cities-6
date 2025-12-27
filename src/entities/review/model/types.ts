import { type User } from '@/entities/user';

export interface Review {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export interface CommentData {
  comment: string;
  rating: number;
}
