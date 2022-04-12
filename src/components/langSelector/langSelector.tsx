import React, { FocusEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import classes from './langSelector.module.scss';
import setLanguage from 'next-translate/setLanguage'

const localsArray = [
  {
    lang: 'fa',
    flag: '🇮🇷',
  },
  {
    lang: 'en',
    flag: '🇺🇸'
  }
]

const LangOptions = ({ close, currentLang }:{ close: () => void, currentLang: string }) => {
  const onLangChange = async ( lang: string ) => {
    close();
    await setLanguage(lang)

    const htmlElement = document.querySelectorAll('html')[0];
    htmlElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
    htmlElement.setAttribute('lang', lang === 'fa' ? 'fa' : 'eng');
  }

  return (
    <div id='langSelectorElementsWrapper' className={ classes.optionsWrapper }>
      {
        localsArray.map(({ lang, flag }) => {
          if ( lang !== currentLang ) return (
            <button className={ classes.option } key={ lang } onClick={ () => { onLangChange(lang) } }>
              { flag + ' ' + lang }
            </button>
          )
        })
      }
    </div>
  )
}

function LangSelector() {
  const [ isOpen, setIsOpen ] = useState(false);
  const closeRef = useRef< NodeJS.Timeout >()

  const { lang } = useTranslation();

  const onLeave = () => {
    console.log('onLeave')
    closeRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 3000)
  }

  const onEnter = () => {
    closeRef.current && clearTimeout(closeRef.current);
  }

  useEffect(() => {
    return () => {
      closeRef.current && clearTimeout(closeRef.current);
    }
  }, [])

  return (
    <div onMouseLeave={ onLeave } onMouseEnter={ onEnter } className={ classes.langSelector }>
      <button onClick={ () => setIsOpen(current => !current) } className={ classes.selectButton }>
        { lang } 
      </button>
      {
        isOpen ? <LangOptions currentLang={ lang } close={ () => setIsOpen(false) } /> : null
      }
    </div>
  )
}

export default LangSelector