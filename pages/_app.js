import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

// import '../imports/css/normalize.css'
// import '../imports/css/skeleton.css'
// import './global.scss'

const icon = '/assets/icon.png'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='icon' href={icon} />
        <meta charSet='utf-8' />
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta
          name='viewport'
          content='user-scalable=0, initial-scale=1,
            minimum-scale=1, width=device-width, height=device-height'
        />
        {/* PWA primary color */}
        <meta name='theme-color' content='#34644c' />
        {/* Open Graph Protocol support. */}
        <meta property='og:type' content='website' />
        <meta property='og:image' content={icon} />
        {/*
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
        */}
      </Head>
      <Component {...pageProps} />
    </>
  )
}
MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object
}

export default MyApp
