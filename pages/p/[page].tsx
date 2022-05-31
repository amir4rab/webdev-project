import React from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

// back end utils //
import readFiles from '@/backend-utils/readFiles';
import readAllFiles from '@/backend-utils/readAllFiles';

// types //
import { BlogHeaderArray } from '@/types/blogHeader';

// components //
import BlogPaginatedPage from '@/components/blogPaginatedPage';

interface PageProps {
  blogHeaderArray: BlogHeaderArray;
  currentPage: number;
  pages: number;
}
const PaginatedHome:NextPage<PageProps> = ({ blogHeaderArray = [], currentPage, pages }) => {
  return <BlogPaginatedPage blogHeaderArray={ blogHeaderArray } currentPage={ currentPage } pages={ pages } />
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const response = await readFiles('markdown/blogs', parseInt( context.params?.page as string ), 5 );

  return ({
    props: {
      blogHeaderArray: response.contentArray,
      currentPage: response.currentPage,
      pages: response.pages,
    }
  })
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const response = await readAllFiles('markdown/blogs');
  const pagesCount = Math.ceil(response.length / 5);
  const pages = [];
  for( let i = 1; i <= pagesCount; i++ ) {
    pages.push(i);
  }

  const paths = pages.flatMap(num => {
    const params = {
      page: `${num}`,
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