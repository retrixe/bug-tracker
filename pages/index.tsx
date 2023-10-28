import React from 'react'
import { type GetServerSidePropsResult as Res } from 'next'
import Issue from '../src/client/issue'
import Title from '../src/client/title'
import Layout from '../src/client/layout'

import type IssueType from '../src/shared/types/issue'

const Index = (props: { issues: IssueType[] }): JSX.Element => {
  return (
    <Layout>
      <Title title='Bug Tracker' url='/' description='A lightweight website that tracks bugs.' />
      {props.issues.map(issue => <Issue key={issue.id} issue={issue} />)}
    </Layout>
  )
}

export async function getServerSideProps (): Promise<Res<{ issues: IssueType[] }>> {
  // TODO: Authenticated users should see all issues.
  const issues = await storageBackend.getIssues(false).catch(console.error) ?? []
  return { props: { issues } }
}

export default Index
