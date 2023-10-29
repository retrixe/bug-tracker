import React from 'react'
import { type GetServerSidePropsResult } from 'next'
import Issue from '../src/client/issue'
import Title from '../src/client/title'
import Layout from '../src/client/layout'

import { type IssueWithoutBody } from '../src/shared/types/issue'
import type Label from '../src/shared/types/label'

interface Props {
  issues: IssueWithoutBody[]
  labels: Label[]
}

const Index = (props: Props): JSX.Element => {
  return (
    <Layout>
      <Title title='Bug Tracker' url='/' description='A lightweight website that tracks bugs.' />
      {props.issues.map(issue => <Issue key={issue.id} issue={issue} labels={props.labels} />)}
    </Layout>
  )
}

export async function getServerSideProps (): Promise<GetServerSidePropsResult<Props>> {
  // TODO: Authenticated users should see all issues.
  const issues = await storageBackend.getIssues(false).catch(console.error) ?? []
  const labels = await storageBackend.getLabels().catch(console.error) ?? []
  return { props: { issues, labels } }
}

export default Index
