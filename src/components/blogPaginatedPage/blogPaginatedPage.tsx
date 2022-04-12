import React from 'react'
import { BlogHeaderArray } from '@/types/blogHeader';
import BlogHeaders from '../blogHeaders';
import Pagination from '../pagination';
import { useRouter } from 'next/router';

import classes from './blogPage.module.scss';
import { IoArrowBack } from 'react-icons/io5';

interface Props {
  blogHeaderArray: BlogHeaderArray;
  currentPage: number;
  pages: number;
}
function BlogPaginatedPage({ currentPage, blogHeaderArray, pages }:Props) {
  const router = useRouter();

  return (
    <div className={ classes.paginatedBlogPage }>
      <header className={ classes.header }>
        <button className={ classes.backButton } onClick={ () => router.push('/') }>
          <IoArrowBack />
        </button>
        <h1 className={ classes.title }>
          Page { currentPage }
        </h1>
      </header>
      <div className={ classes.content }>
        <BlogHeaders blogHeaderArray={ blogHeaderArray } />
      </div>
      <Pagination currentPage={ currentPage } pageCount={ pages } transitionFunction={ async (num: number) => {await router.push('/p/' + num)} } />
    </div>
  )
}

export default BlogPaginatedPage