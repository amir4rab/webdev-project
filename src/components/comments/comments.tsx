import React, { useRef, useState } from 'react'

// types
import { DisplayedComment } from '@/types/displayedComment';
import { Comment as CommentType } from '@prisma/client';

// auth
import { useSession } from 'next-auth/react';

// translation
import useTranslation from 'next-translate/useTranslation';

// styles
import classes from './comments.module.scss';

interface Props {
  comments: DisplayedComment[],
  blogSlug: string
}
function Comments({ comments, blogSlug }: Props) {
  const session = useSession();

  const [ cashedComments, setCashedComments ] = useState< CommentType[] >([]);
  
  // translation
  const { t, lang } = useTranslation('blog');
  const { t: tCommon } = useTranslation('common');
  
  // ref
  const textAreaRef = useRef< HTMLTextAreaElement | null >( null );

  // event handlers
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if( textAreaRef.current === null || textAreaRef.current.value === '' ) return;
    if ( session.status !== 'authenticated' ) return;

    const commentText = textAreaRef.current.value;
    const username = session.data.user?.name!;

    const response = await fetch (
      '/api/comment/submit',
      {
        method: 'post',
        body: JSON.stringify({
          comment: commentText,
          blogSlug
        })
      }
    );
    try {
      const json = await response.json();
      const { status }:{ status: boolean } = json;
      
      if ( !status ) {
        return;
      }
      
      textAreaRef.current.value = '';
    } catch (err) {
      console.error(err);
      return;
    }

    setCashedComments(current => [
      ...current,
      {
        blogSlug: '',
        commentId: (Math.random() * 15).toFixed(0),
        text: commentText,
        userId: username
      }
    ])
  }
  
  return (
    <div className={ classes.commentSection } dir={ lang === 'fa' ? 'rtl' : 'ltr' }>
      <h4 className={ classes.commentTitle }>
        { t('comments') }
      </h4>
      <div className={ classes.commentsWrapper }>
        {
          comments.map(c => (
            <div className={ classes.comment } key={ c.commentId }>
              <p className={ classes.commentAuthor }>{ c.user.name + ':' }</p>
              <p className={ classes.commentText }>{ c.text }</p>
            </div>
          ))
        }
        {
          cashedComments.map(c => (
            <div className={ classes.comment } key={ c.commentId }>
              <p className={ classes.commentAuthor }>{ c.userId + ':' }</p>
              <p className={ classes.commentText }>{ c.text }</p>
            </div>
          ))
        }
        {
          ( comments.length === 0 && cashedComments.length === 0 ) && <p className={ classes.noComments }>{ t('noComments') }</p>
        }
      </div>
      {
        session.status === 'authenticated' && 
        <form onSubmit={ onFormSubmit } className={ classes.commentForm }>
          <textarea ref={ textAreaRef } rows={ 5 }/>
          <button type='submit'>
            { tCommon('submit') }
          </button>
        </form>
      }
      {
        session.status === 'unauthenticated' && 
        <p className={ classes.noComments }>{ t('loginToSubmitComment') }</p>
      }
    </div>
  )
}

export default Comments