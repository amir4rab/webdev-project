import { useCallback, useEffect, useState } from "react";

const usePreferColorScheme = () => {
  const [ initialRun, setInitialRun ] = useState(true);
  const getUserPastPreference = () => localStorage.getItem('themeScheme');

  const generateColorPreference = () => {
    const preferDarkMood = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if ( preferDarkMood ) {
      localStorage.setItem('themeScheme', 'dark');  
      document.body.setAttribute('class', 'dark');
    } else {
      localStorage.setItem('themeScheme', 'light');
      document.body.setAttribute('class', 'light');
    }
  }

  const init = useCallback( async () => {
    const userPreference = getUserPastPreference();

    if ( userPreference === null ) {
      generateColorPreference();
    } else {
      document.body.setAttribute('class', userPreference);
    }

    setInitialRun(false);
  }, []);

  useEffect(() => {
    if ( typeof window === 'undefined' && !initialRun ) return;
    init();
  }, [ init, initialRun ])
}

export default usePreferColorScheme;