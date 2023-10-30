import React from 'react'
import { DateTime } from 'luxon'
import Title from '../../src/client/title'
import Layout from '../../src/client/layout'
import Reply, { ReplyComment } from '../../src/client/reply'

import type Issue from '../../src/shared/types/issue'
import { type GetServerSidePropsContext as Ctx, type GetServerSidePropsResult as Res } from 'next'
import { ReplyAction } from '../../src/shared/types/reply'

interface Props { issue: Issue | null }

const IssuePage = ({ issue }: Props): JSX.Element => {
  if (!issue) {
    return (
      <Layout>
        <Title title='Issue Not Found - Bug Tracker' url='/' description='A lightweight website that tracks bugs.' />
        <p>This issue was not found! Go back to the home page?</p>
      </Layout>
    )
  }
  // FIXME: labels, assignedTo
  const comments = issue.replies.filter(reply => reply.action === ReplyAction.COMMENT).length
  const date = DateTime.fromMillis(issue.createdAt).toLocaleString(DateTime.DATE_MED)
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
      <ReplyComment date={date} content={issue.content} author={issue.author} />
      {issue.replies.map((reply, index) => (
        <Reply
          key={index}
          date={DateTime.fromMillis(reply.createdAt).toLocaleString(DateTime.DATE_MED)}
          author={reply.author}
          content={reply.content}
          action={reply.action}
        />
      ))}
    </Layout>
  )
}

export async function getServerSideProps (context: Ctx): Promise<Res<Props>> {
  if (!context.params?.id || isNaN(+context.params.id)) return { props: { issue: null } }
  let issue = await storageBackend.getIssue(+context.params.id).catch(console.error) ?? null
  if (issue?.hidden) issue = null // FIXME: Authenticated users can see hidden issues.
  return { props: { issue } }
}

export default IssuePage
