import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { type AppProps } from 'next/app'
import { HTTPError } from 'ky'
import AuthContext, { type AuthState } from '../src/client/hooks/authContext'
import api from '../src/client/hooks/api'

// import '../imports/css/normalize.css'
// import '../imports/css/skeleton.css'
import './global.scss'

const icon = '/assets/icon.png'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  const [authenticated, setAuthenticated] = useState<AuthState | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    api('auth').json<{ success: boolean, privileged: boolean }>()
      .then(({ privileged }) => setAuthenticated({ authenticated: true, privileged }))
      .catch((err: unknown) => {
        if (err instanceof HTTPError && err.response.status === 403) {
          setAuthenticated({ authenticated: false, privileged: false })
        } else console.error(err)
      })
  }, [])

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
      <AuthContext.Provider value={authenticated}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  )
}

export default MyApp
