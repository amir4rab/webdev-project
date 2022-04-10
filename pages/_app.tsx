import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import useTranslation from 'next-translate/useTranslation';

import Layout from '@/layout/index';
import usePreferColorScheme from '@/hooks/usePreferColorScheme';

function MyApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation('website-info')
  const preferColorScheme = usePreferColorScheme();

  return (
    <>
      <Head>
        <title>{ t('title') }</title>
        <meta property="description" content={ t('description') } />

        <meta property="og:title" content="Test" key="title" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
