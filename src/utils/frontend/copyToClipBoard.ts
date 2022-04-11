import React from 'react'

const CopyToClipBoard = async ( value: string ) => {
  try {
    if ( navigator.clipboard ) {
      try {
        await navigator.clipboard.writeText(value);
      } catch( err ) {
        console.error(err)
      }
    }
  } catch(err) { console.error(err) };
}

export default CopyToClipBoard