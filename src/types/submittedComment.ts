import { Comment } from '@prisma/client';

export interface SubmittedComment {
  text: Comment['text'],
  blogSlug: Comment['blogSlug'],
  userEmail: string
}