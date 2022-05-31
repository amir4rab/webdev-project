import { Comment } from '@prisma/client';

export interface DisplayedComment {
  text: Comment['text'];
  blogSlug: Comment['blogSlug'];
  commentId: Comment['commentId'];
  user: {
    name: string | null;
  }
}