import React from 'react'
import Document, { Main, NextScript, Head, Html } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='en' dir='ltr'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
