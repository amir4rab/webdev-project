import React from 'react'
import ToggleTheme from '../toggleTheme';
import classes from './navbar.module.scss';

import useTranslation from 'next-translate/useTranslation';
import LangSelector from '../langSelector';
import Link from 'next/link';
import AuthButton from '../authButton';

const Navbar = () => {
  const { t } = useTranslation('common');
  
  return (
    <nav className={ classes.navbar }>
      <div className={ classes.inner }>
        <Link passHref href='/'>
          <p className={ classes.title }>
            { t('websiteTitle') }
          </p>
        </Link>
        <div className={ classes.links }>
          <AuthButton />
          <LangSelector />
          <ToggleTheme />
        </div>
      </div> 
    </nav>
  )
}

export default  Navbar