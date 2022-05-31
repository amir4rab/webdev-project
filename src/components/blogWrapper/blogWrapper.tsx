/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRouter } from 'next/router';

// icons
import { IoArrowBack, IoCopy, IoSad, IoShare } from 'react-icons/io5';

// classes
import classes from './blogWrapper.module.scss';

// types
import { BlogHeader } from '@/types/blogHeader';
import { DisplayedComment } from '@/types/displayedComment';

// components
import MarkdownEngine from '../markdownEngine/markdownEngine';
import Comments from '../comments';

// util functions
import generateDate from '@/frontend-utils/generateData';
import copyToClipBoard from '@/frontend-utils/copyToClipBoard';
import socialLink, { socialMediaArray } from '@/frontend-utils/socialLink';

// hooks
import useBrowserShare from '@/hooks/useBrowserShare';
import useTranslation from 'next-translate/useTranslation';

export interface BlogProps {
  blogHeader: BlogHeader;
  markdownContent: string;
  rawMarkdown: string;
  comments: DisplayedComment[]
}

const BlogWrapper = ({ blogHeader, markdownContent, rawMarkdown, comments=[] }:BlogProps) => {
  const { t, lang } = useTranslation('blog')
  const { canShare, share } = useBrowserShare();
  const router = useRouter();

  const openSocial = ( name: string ) => {
    const url = socialLink(window.location.toString(), name, blogHeader.title);
    window.open(url, '_blank', 'noreferrer')
  }

  return (
    <>
      <article dir={ blogHeader.language === 'fa' ? 'rtl' : 'ltr' } className={ classes.blogWrapper }>
        <img loading='lazy' src={ blogHeader?.thumbnail } alt={ blogHeader.shortInfo } className={ classes.img } />
        <header className={ classes.header }>
          <button aria-label='back button' onClick={ () => router.back() } className={ classes.backButton }>
            <IoArrowBack />
          </button>
          <h1 className={ classes.title }>
            { lang === 'en' ? blogHeader.title : blogHeader.titlePer }
          </h1>
          <p className={ classes.date }>
            { generateDate(parseInt(blogHeader.date)) }
          </p>
        </header>
        {
          lang !== blogHeader.language ?
          <div className={ classes.warning } dir={ lang === 'fa' ? 'rtl' : 'ltr' }>
            <IoSad />
            <p>{ t('notAvailableInLang') }</p>
          </div> : null
        }
        <MarkdownEngine rawMarkdown={ rawMarkdown } />
      </article>
      <Comments blogSlug={ blogHeader.slug } comments={ comments }/>
      <footer className={ classes.footer }>
        <p className={ classes.title }>
          { t('helpFullContent') }
        </p>
        <div dir='ltr' className={ classes.shareButtons }>
          <button onClick={ () => copyToClipBoard(window.location.toString()) } className={ classes.shareButton }>
            <IoCopy />
            <p>{ t('copyUrl') }</p>
          </button>
          <button onClick={ () => share(window.location.toString()) } disabled={ !canShare } className={ classes.shareButton }>
            <IoShare />
            <p>{ t('shareUrl') }</p>
          </button>
        </div>
        <p className={ classes.subtitle }>
          { t('orShareOn') }
        </p>
        <div dir='ltr' className={ classes.shareLinks }>
          {
            socialMediaArray.map(social => (
              <button key={ social.name } onClick={ () => openSocial(social.name) } className={ classes.shareButton }>
                <social.icon />
                <p>
                  { social.name }
                </p>
              </button>
            ))
          }
        </div>
      </footer>
    </>
  )
}

export default BlogWrapper