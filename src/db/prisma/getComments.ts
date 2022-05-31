import { DisplayedComment } from '@/types/displayedComment';
import { prisma } from './connect';

export const getCommentsByBlogSlug =  async ( blogSlug: string ): Promise<DisplayedComment[]> => {
  const comments = await prisma.comment.findMany({ 
    where:{ 
      blogSlug,
    },
    select: {
      blogSlug: true,
      commentId: true,
      text: true,
      user: {
        select: {
          name: true
        }
      }
    }
  });

  return comments;
}

export const getCommentsByUser =  async ( userId: string ) => {
  const comments = await prisma.comment.findMany({ where: { userId } });

  return comments;
}