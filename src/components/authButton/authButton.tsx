import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import classes from './authButton.module.scss';

const AuthButton = () => {
  const session = useSession();

  const eventManager = () => {
    if ( session.status === 'loading' ) return;

    if ( session.status === 'authenticated' ) {
      signOut();
      return;
    }

    if ( session.status === 'unauthenticated' ) {
      signIn('github');
      return;
    }
  }

  return (
    <button className={ classes.authButton } onClick={ eventManager }>
      {
        session.status === 'loading' && 'loading'
      }
      {
        session.status === 'authenticated' && 'Logout'
      }
      {
        session.status === 'unauthenticated' && 'Login With Github'
      }
    </button>
  )
}

export default AuthButton;