/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { BlogHeaderArray } from '@/types/blogHeader';
import Image from 'next/image';
import Link from 'next/link';

import classes from './blogHeaders.module.scss';
import useTranslation from 'next-translate/useTranslation';
import generateDate from '@/frontend-utils/generateData';

interface Props {
  blogHeaderArray: BlogHeaderArray;
}
function BlogHeaders({ blogHeaderArray }: Props) {
  const { t, lang } = useTranslation('common');

  return (
    <div className={ classes.blogHeaders }>
      { blogHeaderArray.map( blog => (
        <article className={ classes.blog } key={ blog.slug }>
          <div className={ classes.imageWrapper }>
            <img src={ blog.thumbnail } alt={ blog.thumbnail } />
          </div>
          <div className={ classes.content }>
            <h2 className={ classes.title }>
              { lang === 'en' ? blog.title : null }
              { lang === 'fa' ? blog.titlePer : null }
            </h2>
            <p className={ classes.description }>
              { lang === 'en' ? blog.shortInfo : null }
              { lang === 'fa' ? blog.shortInfoPer : null }
            </p>
            <div className={ classes.actions }>
              <div className={ classes.inner }>
                <p className={ classes.moreInfo }>
                  { `Language: ` + blog.language.toUpperCase() }
                </p>
                <Link passHref href={`/blog/${blog.slug}`}>
                  <button className={ classes.linkButton }>
                    { t('readMore') }
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      )) }
    </div>
  )
}

export default BlogHeaders