import type { NextApiRequest, NextApiResponse } from 'next'
import Ajv, { JSONSchemaType } from 'ajv'

import xss from 'xss';

import { existsSync } from 'fs';

import { getSession } from 'next-auth/react';
import { submitComment } from '@/db/prisma';
import path from 'path';

type Data = {
  status: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { body } = req;
  const json = await JSON.parse(body);
  const session = await getSession({ req });

  if ( req.method !== 'POST' ) {
    res.status(405).json({ status: false })
    return;
  };

  // verifying Session
  if ( !session || !session.user || !session.user.email ) { // ending the handler session doesn't exists
    res.status(401).json({ status: false })
    return;
  };

  // verifying Schema
  const commentSchema: JSONSchemaType<{ comment: string, blogSlug: string }> = {
    type: 'object',
    properties: {
      'comment': { type: 'string' },
      'blogSlug': { type: 'string' }
    },
    required: [
      'comment',
      'blogSlug'
    ],
    additionalProperties: false
  }
  const ajv = new Ajv();

  const validate = ajv.compile(commentSchema);
  const valid = validate(json);

  if ( !valid ) { // ending the handler if request body schema is false
    res.status(400).json({ status: false })
    return;
  }

  // xss
  const purifiedComment = xss(json.comment);
  const purifiedSlug = xss(json.blogSlug);


  // verifying existing of the Blog
  const pathOfBlog = path.resolve(process.cwd(), 'markdown', 'blogs', purifiedSlug+'.md' );
  const blogExist = existsSync(pathOfBlog)
  if ( !blogExist ) {
    res.status(400).json({ status: false });
    return;
  }

  const result = await submitComment({
    blogSlug: purifiedSlug,
    text: purifiedComment,
    userEmail: session.user.email
  });

  if ( !result ) { // ending the handler if something went wrong on saving to db
    res.status(500).json({ status: false })
    return;
  }

  // rebuilding pages
  res.unstable_revalidate(`/blog/${purifiedSlug}`);
  res.unstable_revalidate(`/fa/blog/${purifiedSlug}`);

  res.status(201).json({ status: true })
}


export default handler;
