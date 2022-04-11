import React from 'react'
import { SiTwitter, SiFacebook, SiLinkedin, SiReddit, SiWhatsapp } from 'react-icons/si';

const socialLink = ( url: string, socialMedia: string, text: string= '' ) => {
  switch ( socialMedia ) {
    case 'twitter': return 'https://twitter.com/intent/tweet?text=' + text + ' read more: ' + url;
    case 'linkedin': return 'https://www.linkedin.com/shareArticle?' + text + ' read more: ' + url;
    case 'reddit': return 'https://www.reddit.com/submit?url=' + url;
    case 'facebook': return 'https://www.facebook.com/sharer.php?u=' + url;
    case 'whatsapp': return 'whatsapp://send?text=' + text + ' read more: ' + url;
    default: return '';
  };
}

export const socialMediaArray = [
  {
    name: 'twitter',
    icon: SiTwitter,
  },
  {
    name: 'linkedin',
    icon: SiLinkedin,
  },
  {
    name: 'reddit',
    icon: SiReddit,
  },
  {
    name: 'facebook',
    icon: SiFacebook,
  },
  {
    name: 'whatsapp',
    icon: SiWhatsapp,
  },
]

export default socialLink