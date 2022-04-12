import { useEffect, useState } from 'react'

const useBrowserShare = () => {
  const [ canShare, setCanShare ] = useState(false);
  const [ loaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    if ( typeof window !== 'undefined' && navigator.canShare && typeof ClipboardItem !== 'undefined' ) {
      setCanShare(true);
      setIsLoaded(true)
    }
  }, []);

  const share = async ( shareText: string ) => {
    if ( canShare ) {
      try {
        navigator.share({
          text: shareText,
        })
      } catch (err) { console.error(err) }
    }
  }

  return ({
    canShare: loaded || !canShare ? false : true,
    share
  })
}

export default useBrowserShare