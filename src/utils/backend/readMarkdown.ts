import fs from 'fs';

import { unified } from 'unified';

import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import matter from 'gray-matter';

import { BlogHeader } from '@/types/blogHeader';

const readMarkdown = async ( url: string ) => {
  const path = process.cwd() + '/' + url;
  const markdownContent = fs.readFileSync(path, 'utf-8');

  const { data, content } = matter(markdownContent);

  const htmlContent = unified().use(remarkParse).use(remarkHtml).processSync(content);
  
  return ({ header: {
    ...data,
    slug: ( data.title as string ).toLowerCase().replace(/\s/g, '-')
  } as BlogHeader, html: htmlContent.toString(), markdown: content });
}

export default readMarkdown;