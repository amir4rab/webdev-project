import React from 'react'
import Navbar from '@/components/navbar';
import classes from './layout.module.scss';

interface Props {
  children: JSX.Element
}

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className={ classes.layout }>
        { children }
      </main>
    </>
  )
}

export default Layout