import { prisma } from './connect';
import Ajv, { JSONSchemaType } from 'ajv';

import { Comment, Prisma } from '@prisma/client';
import { SubmittedComment } from '@/types/submittedComment';
import { v4 } from 'uuid';

export const submitComment = async ( comment: SubmittedComment ) => {
  const commentSchema: JSONSchemaType< SubmittedComment > = {
    type: 'object',
    properties: {
      'userEmail': { type: 'string' },
      'text': { type: 'string' },
      'blogSlug': { type: 'string' }
    },
    required: [
      'userEmail',
      'text',
      'blogSlug'
    ],
    additionalProperties: false
  }
  const ajv = new Ajv();

  const validate = ajv.compile(commentSchema);
  const valid = validate(comment);

  if ( !valid ) {
    return false;
  }

  const userEmail = await prisma.user.findUnique({ where:{ email: comment.userEmail }, select:{ id: true } });
  if ( !userEmail ) {
    return false;
  }

  console.log(userEmail.id);
  
  try {
    const response = await prisma.comment.create({ data: {
      userId: userEmail.id!,
      blogSlug: comment.blogSlug,
      text: comment.text,
      commentId: v4()
    }});
    return true
  } catch (err) {
    console.log(err);
    return false;
  }
}