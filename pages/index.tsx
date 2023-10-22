import React from 'react'
import { type GetServerSidePropsResult } from 'next'
import Issue from '../src/client/issue'
import Title from '../src/client/title'
import Layout from '../src/client/layout'

import { getIssues } from './api/issues'
import type IssueType from '../src/shared/types/issue'

const Index = (props: { issues: IssueType[] }): JSX.Element => {
  return (
    <Layout>
      <Title title='Bug Tracker' url='/' description='A lightweight website that tracks bugs.' />
      {props.issues.map(issue => <Issue key={issue.id} issue={issue} />)}
    </Layout>
  )
}

export async function getServerSideProps (): Promise<GetServerSidePropsResult<{
  issues: IssueType[]
}>> {
  let issues
  try {
    issues = await getIssues()
  } catch (e) { console.error(e) }
  return {
    props: { issues: issues ?? [] }
  }
}

export default Index
