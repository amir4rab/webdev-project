import React from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

// back end utils //
import readAllFiles from '@/backend-utils/readAllFiles';
import readMarkdown from '@/backend-utils/readMarkdown';

// components end types //
import BlogWrapper, { BlogProps } from '@/components/blogWrapper';

const PaginatedHome:NextPage<BlogProps> = ( props ) => {
  return (<BlogWrapper { ...props } />)
}

export const getStaticProps: GetStaticProps<BlogProps> = async (context) => {
  const { header, html, markdown } = await readMarkdown('markdown/blogs/' + context.params!.slug as string + '.md');

  return ({
    props: {
      blogHeader: header,
      markdownContent: html,
      rawMarkdown: markdown
    }
  })
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const response = await readAllFiles('markdown/blogs');
  const paths = response.flatMap(({ slug }) => {
    const params = {
      slug: slug,
    };

    return ([
      {
        params
      },
      ...locales!.map(locale => ({ params, locale }))
    ])
  });

  return ({
    paths,
    fallback: false
  })
}

export default PaginatedHome