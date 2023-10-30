import React, { useContext, useEffect, useState } from 'react'
import { type GetServerSidePropsResult } from 'next'
import IssueListItem from '../src/client/components/display/IssueListItem'
import Layout from '../src/client/components/layout/Layout'
import Metadata from '../src/client/components/layout/Metadata'
import api from '../src/client/hooks/api'
import AuthContext from '../src/client/hooks/authContext'

import { type IssueWithoutBody } from '../src/shared/types/issue'
import type Label from '../src/shared/types/label'

interface Props {
  issues: IssueWithoutBody[]
  labels: Label[]
}

const Index = (props: Props): JSX.Element => {
  const auth = useContext(AuthContext)
  const [issues, setIssues] = useState<IssueWithoutBody[]>(props.issues)

  useEffect(() => {
    if (auth?.privileged) { // Try to refetch the issue list if the user is privileged.
      api.get('issues').json<IssueWithoutBody[]>().then(setIssues).catch(console.error)
    }
  }, [auth])

  return (
    <Layout>
      <Metadata title='Bug Tracker' url='/' description='A lightweight website that tracks bugs.' />
      {issues.map(issue => (
        <IssueListItem key={issue.id} issue={issue} labels={props.labels} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps (): Promise<GetServerSidePropsResult<Props>> {
  const issues = await storageBackend.getIssues(false).catch(console.error) ?? []
  const labels = await storageBackend.getLabels().catch(console.error) ?? []
  return { props: { issues, labels } }
}

export default Index
