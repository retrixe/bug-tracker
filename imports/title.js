import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

const Title = ({ title, description, url }) => (
  <Head>
    <title>{title}</title>
    <meta property='og:title' content={title} />
    <meta property='og:url' content={url} /> {/* TODO */}
    <meta property='og:description' content={description} />
    <meta name='Description' content={description} />
  </Head>
)
Title.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

const TitleMemo = React.memo(Title)
export default TitleMemo
