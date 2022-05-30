import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import useTranslation from 'next-translate/useTranslation';

import Layout from '@/layout/index';
import usePreferColorScheme from '@/hooks/usePreferColorScheme';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation('website-info')
  const _ = usePreferColorScheme();

  return (
    <>
      <Head>
        <title>{ t('title') }</title>
        <meta property="description" content={ t('description') } />

        <meta property="og:title" content="Test" key="title" />
      </Head>
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}

export default MyApp
