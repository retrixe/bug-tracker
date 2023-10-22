import React from 'react'
import { DateTime } from 'luxon'
import Title from '../../src/client/title'
import Layout from '../../src/client/layout'
import ReplyAction, { Reply } from '../../src/client/reply'

import { getIssue } from '../api/issue/[id]'
import type Issue from '../../src/shared/types/issue'
import { type GetServerSidePropsContext, type GetServerSidePropsResult } from 'next'

const IssuePage = ({ issue }: { issue: Issue }): JSX.Element => {
  const comments = React.useMemo(
    () => issue?.replies.filter(reply => reply.action === 'reply').length, [issue]
  )
  if (!issue) {
    return (
      <Layout>
        <Title title='Issue Not Found - Bug Tracker' url='/' description='A lightweight website that tracks bugs.' />
        <p>This issue was not found! Go back to the home page?</p>
      </Layout>
    )
  }
  // TODO: labels, assignedTo
  const date = DateTime.fromMillis(issue.timestamp).toLocaleString(DateTime.DATE_MED)
  return (
    <Layout>
      <Title title='Bug Tracker' url='/' description='A lightweight website that tracks bugs.' />
      <h2><span style={{ fontWeight: 300 }}>#{issue.id}</span> {issue.title}</h2>
      <div
        style={{ // TODO: Add an issue SVG.
          padding: 8,
          color: 'white',
          marginRight: 8,
          borderRadius: 16,
          display: 'inline',
          backgroundColor: issue.open ? 'green' : 'red'
        }}
      >
        {issue.open ? 'Open' : 'Closed'}
      </div>
      <span style={{ fontWeight: 300 }}>
        <b>{issue.author}</b> opened this issue on {date} · {comments} comment{comments > 1 ? 's' : ''}
      </span>
      {/* <hr style={{ marginTop: '1em', marginBottom: '1em', color: '#eee', backgroundColor: '#eee' }} /> */}
      <Reply date={date} content={issue.content} author={issue.author} />
      {issue.replies.map((reply, index) => (
        <ReplyAction
          key={index}
          date={DateTime.fromMillis(reply.timestamp).toLocaleString(DateTime.DATE_MED)}
          author={reply.author}
          content={reply.content}
          action={reply.action}
        />
      ))}
    </Layout>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<
GetServerSidePropsResult<{ issue: Issue | null }>> {
  if (!context.params?.id || isNaN(+context.params.id)) return { props: { issue: null } }
  let issue
  try { issue = await getIssue(+context.params.id) } catch (e) { console.error(e) }
  return { props: { issue: issue ?? null } }
}

export default IssuePage
