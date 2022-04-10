import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === 'fa' ? 'rtl' : 'ltr';
    return (
      <Html lang={ locale } dir={ dir }>
        <Head>
          <link 
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;900&display=swap" 
            rel="stylesheet"
          />
          <link 
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;900&display=swap" 
            rel="stylesheet"
          />
        </Head>
        <body className='dark'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
