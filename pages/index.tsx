import type { NextPage, GetStaticProps } from 'next';
import HomeComponent from '@/components/home';

import readFiles from '@/backend-utils/readFiles';

import { BlogHeaderArray } from '@/types/blogHeader';


interface PageProps {
  pages: number;
  blogHeaderArray: BlogHeaderArray;
}

const Home: NextPage<PageProps> = ({ pages, blogHeaderArray }) => {
  return <HomeComponent pages={ pages } blogHeaderArray={ blogHeaderArray } />
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const response = await readFiles('markdown/blogs', 1, 5)

  return ({
    props: { 
      pages: response.pages,
      blogHeaderArray: response.contentArray
    }
  })
}

export default Home
