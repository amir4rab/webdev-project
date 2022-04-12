import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import Pagination from '../pagination';

import { BlogHeaderArray } from '@/types/blogHeader';

import classes from './home.module.scss';
import BlogHeaders from '../blogHeaders';
import { useRouter } from 'next/router';

interface Props {
  pages: number;
  blogHeaderArray: BlogHeaderArray;
}
function Home( { pages, blogHeaderArray }: Props ) {
  const { t } = useTranslation('home');
  const router = useRouter();

  return (
    <div className={ classes.home }>
      <header className={ classes.header }>
        <h1 className={ classes.title }>
          { t('welcome') }
        </h1>
        <h3 className={ classes.subtitle }>
          { t('description') }
        </h3>
      </header>
      <div className={ classes.content }>
        <BlogHeaders blogHeaderArray={ blogHeaderArray } />
      </div>
      <Pagination currentPage={1} pageCount={ pages } transitionFunction={ async (a: number) => { await router.push('/p/' + a) } } />
    </div>
  )
}

export default Home