import useThemeToggle from '@/hooks/useThemeToggle'
import React from 'react';

import classes from './toggleTheme.module.scss'

import { IoSunny, IoMoon } from 'react-icons/io5';

function ToggleTheme() {
  const { colorScheme, toggleScheme } = useThemeToggle();

  return (
    <button className={ classes.toggleTheme } onClick={ () => toggleScheme() }>
      {
        colorScheme === 'light' ?
        <IoSunny /> : <IoMoon />
      }
    </button>
  )
}

export default ToggleTheme