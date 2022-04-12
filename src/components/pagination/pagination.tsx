import React from 'react'
import classes from './pagination.module.scss';

import { IoChevronForward, IoChevronBack } from 'react-icons/io5'
import useTranslation from 'next-translate/useTranslation';

const mapLimitedNumToElement = ( activeNumber: number, pageCount: number, transitionFunction: (a:number) => Promise<void> ) => {
  let array: (string|number)[];
  if ( activeNumber <= 3 ) {
    array = [ 1, 2, 3, 4, 5, '...', pageCount ]
  } else if ( activeNumber + 3 >= pageCount ) {
    array = [ 1, '...', pageCount-4, pageCount-3, pageCount-2, pageCount-1 , pageCount ]
  } else {
    array = [ 1, '...', activeNumber - 1, activeNumber, activeNumber + 1, '...' , pageCount ];
  }

  const returnArray: JSX.Element[] = array.map(( item, i ) => {
    if ( typeof item === 'number' ) return (
      <button onClick={ () => transitionFunction(item) } key={ item } className={[ classes.numButton, activeNumber === item ? classes.active : null ].join(' ')}>
        { item }
      </button>
    )
    return (
      <button key={ item } className={ classes.moreButton }>
        { item }
      </button>
    )
  });

  return returnArray;
}

const mapNumToElement = ( end: number, activeNumber: number, transitionFunction: (a:number) => Promise<void> ) => {
  const returnArray: JSX.Element[] = [];
  for ( let i = 1; i<= end; i++ ) {
    returnArray.push(
      <button 
        onClick={ () => { if ( i !== activeNumber ) transitionFunction(i) } }
        key={ i } 
        className={[ classes.numButton, activeNumber === i ? classes.active : null ].join(' ')}
      >
        { i }
      </button>
    )
  }

  return returnArray;
}

interface Props {
  pageCount: number;
  currentPage: number;
  transitionFunction: (a:number) => Promise<void>;
  children?: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children, currentPage, transitionFunction, pageCount }: Props) => {
  const { lang } = useTranslation();

  return (
    <div className={ classes.pagination }>
        <div style={{ flexDirection: lang === 'fa' ? 'row-reverse' : 'row' }} className={ classes.inner }>          
          <button className={ classes.dirButton } disabled={ currentPage === 1 } onClick={ () => { transitionFunction( currentPage - 1 ) } }>
            <IoChevronBack />
          </button>
          { children }
          <button className={ classes.dirButton } disabled={ currentPage === pageCount } onClick={ () => { transitionFunction( currentPage + 1 ) } }>
            <IoChevronForward />
          </button>
        </div>
    </div>
  )
}
function Pagination({ pageCount, currentPage, transitionFunction }: Props) {
  
  if ( pageCount < 7 ) {
    return (
      <Wrapper pageCount={pageCount} currentPage={ currentPage } transitionFunction={ transitionFunction }>
        { mapNumToElement( pageCount, currentPage, transitionFunction ) }
      </Wrapper>
    )
  }
  return (
    <Wrapper pageCount={pageCount} currentPage={ currentPage } transitionFunction={ transitionFunction }>
      { mapLimitedNumToElement( currentPage, pageCount, transitionFunction ) }
    </Wrapper>
  )
}

export default Pagination