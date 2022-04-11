// import fs from 'fs';

// import { BlogHeaderArray, BlogHeader } from '@/types/blogHeader';
// import matter from 'gray-matter';

import readAllFiles from './readAllFiles';

const readMarkdown = async ( url: string, currentPage= 0, pageSize= 1 ) => {
  // const path = process.cwd() + '/' + url;
  // const fileNames = fs.readdirSync(path);
  // const resultArray: BlogHeaderArray = [];
  
  // fileNames.forEach( item => {
  //   const markdownContent = fs.readFileSync(path + '/' + item, 'utf-8');
  //   const { data } = matter(markdownContent);
  //   resultArray.push({
  //     ...data,
  //     slug: ( data.title as string ).toLowerCase().replaceAll(' ', '-')
  //   } as BlogHeader);
  // });

  // const sortedArray = resultArray.sort((a, b) => {
  //   if ( a.date > b.date ) return 1;
  //   if ( a.date < b.date ) return -1;
  //   return 0;
  // })
  const sortedArray = await readAllFiles(url);

  const startPosition = pageSize * (currentPage - 1);
  const endPosition = pageSize * (currentPage);
  const slicedArray = sortedArray.slice( startPosition, endPosition );
  
  const pages = Math.ceil(sortedArray.length / pageSize);
  
  return ({
    contentArray: slicedArray,
    pages,
    currentPage,
  });
}

export default readMarkdown;