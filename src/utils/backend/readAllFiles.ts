import fs from 'fs';

import { BlogHeaderArray, BlogHeader } from '@/types/blogHeader';
import matter from 'gray-matter';

const readMarkdown = async ( url: string ) => {
  const path = process.cwd() + '/' + url;
  const fileNames = fs.readdirSync(path);
  const resultArray: BlogHeaderArray = [];
  
  fileNames.forEach( item => {
    const markdownContent = fs.readFileSync(path + '/' + item, 'utf-8');
    const { data } = matter(markdownContent);
    resultArray.push({
      ...data,
      slug: ( data.title as string ).toLowerCase().replace(/\s/g, '-')
    } as BlogHeader);
  });

  const sortedArray = resultArray.sort((a, b) => {
    if ( a.date < b.date ) return 1;
    if ( a.date > b.date ) return -1;
    return 0;
  })
  
  return sortedArray;
}

export default readMarkdown;