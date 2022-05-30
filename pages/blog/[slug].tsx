import React from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';

// back end utils //
import readAllFiles from '@/backend-utils/readAllFiles';
import readMarkdown from '@/backend-utils/readMarkdown';

// components end types //
import BlogWrapper, { BlogProps } from '@/components/blogWrapper';

const PaginatedHome:NextPage<BlogProps> = ( props ) => {
  return (
  <>
    <Head>
      <meta name='twitter:card' content={ props.blogHeader.shortInfo } />
      <meta name='twitter:url' content='https://uni-project.amir4rab.com/' />
      <meta name='twitter:title' content={ props.blogHeader.title } />
      <meta name='twitter:description' content={ props.blogHeader.shortInfo } />
      <meta name='twitter:image' content={ props.blogHeader.thumbnail } />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={ props.blogHeader.title } />
      <meta property='og:description' content={ props.blogHeader.shortInfo } />
      <meta property='og:site_name' content='My Blog' />
      <meta property='og:url' content='https://uni-project.amir4rab.com' />
    </Head>
    <BlogWrapper { ...props } />
  </>
  )
}

export const getStaticProps: GetStaticProps<BlogProps> = async (context) => {
  const { header, html, markdown } = await readMarkdown('markdown/blogs/' + context.params!.slug as string + '.md');
  const { slug } = header;

  return ({
    props: {
      blogHeader: header,
      markdownContent: html,
      rawMarkdown: markdown
    },
    revalidate: 60
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