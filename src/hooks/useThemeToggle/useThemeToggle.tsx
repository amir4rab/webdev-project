import { useEffect, useState } from "react";

type ColorScheme = 'dark' | 'light';

const getUserPastPreference = (): ColorScheme => {
  const localStorageColorScheme = localStorage.getItem('themeScheme')
  if ( localStorageColorScheme !== null ) return localStorageColorScheme as ColorScheme;

  const preferDarkMood = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if ( preferDarkMood ) return 'dark';
  return 'light';
};



const useThemeToggle = () => {
  const [ preferredColorScheme, setPreferredColorScheme ] = useState<ColorScheme>('dark');
  
  const togglePreferredColorScheme = ( newValue?: ColorScheme ) => {
    const newColorScheme = typeof newValue !== 'undefined' ? newValue : preferredColorScheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('themeScheme', newColorScheme);
    setPreferredColorScheme(newColorScheme);
    document.body.setAttribute('class', newColorScheme)
  };

  useEffect(() => {
    if ( typeof window !== 'undefined' ) setPreferredColorScheme(getUserPastPreference())
  }, [])

  return ({
    colorScheme: preferredColorScheme,
    toggleScheme: togglePreferredColorScheme,
  })
}

export default useThemeToggle;