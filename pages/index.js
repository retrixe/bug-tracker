import React from 'react'
import PropTypes from 'prop-types'
import Issue from '../imports/issue'
import Title from '../imports/title'
import Layout from '../imports/layout'

import { getIssues } from './api/issues'

const Index = (props) => {
  return (
    <Layout>
      <Title title='Bug Tracker' url='/' description='A lightweight website that tracks bugs.' />
      {props.issues.map(issue => <Issue key={issue.id} issue={issue} />)}
    </Layout>
  )
}
Index.propTypes = {
  issues: PropTypes.array.isRequired
}

export async function getServerSideProps (context) {
  let issues
  try {
    issues = await getIssues()
  } catch (e) { console.error(e) }
  return {
    props: { issues: issues ?? [] }
  }
}

export default Index
