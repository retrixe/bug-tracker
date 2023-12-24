import React, { useContext, useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import Layout from '../../src/client/components/layout/Layout'
import Metadata from '../../src/client/components/layout/Metadata'
import Reply, { ReplyComment } from '../../src/client/components/display/Reply'
import api from '../../src/client/hooks/api'
import AuthContext from '../../src/client/hooks/authContext'
import styles from './[id].module.scss'

import type Issue from '../../src/shared/types/issue'
import type LabelType from '../../src/shared/types/label'
import { type GetServerSidePropsContext as Ctx, type GetServerSidePropsResult as Res } from 'next'
import { ReplyAction } from '../../src/shared/types/reply'
import Label from '../../src/client/components/display/Label'

interface Props { issue: Issue | null, labels: LabelType[] }

const IssuePage = ({ issue: issueProp, labels }: Props): JSX.Element => {
  const rawId = useRouter().query.id
  const id = typeof rawId === 'string' && !isNaN(+rawId) ? +rawId : undefined
  const auth = useContext(AuthContext)
  const [issue, setIssue] = useState<Issue | null>(issueProp)

  useEffect(() => {
    if (auth?.privileged) { // Try to refetch the issue if the user is privileged.
      api.get(`issue/${id}`).json<Issue>().then(setIssue).catch(console.error)
    }
  }, [id, auth])

  if (!issue) {
    return (
      <Layout>
        <Metadata
          title='Issue Not Found - Bug Tracker'
          url={`/issue/${id ?? ''}`}
          description='A lightweight website that tracks bugs.'
        />
        <p>This issue was not found! Go back to the home page?</p>
      </Layout>
    )
  }

  const comments = issue.replies.filter(reply => reply.action === ReplyAction.COMMENT).length
  const date = DateTime.fromMillis(issue.createdAt).toLocaleString(DateTime.DATE_MED)
  const renderedLabels = [issue.labels
    .map(name => labels?.find(label => label.name === name))
    .map(label => label ? <Label key={label.name} {...label} /> : null)]
  return (
    <Layout>
      <Metadata
        title={`${issue.title} • Issue #${issue.id} • Bug Tracker`}
        url={`/issue/${issue.id}`}
        description={issue.content.split('\n')[0].substring(0, 100)}
      />
      <h2 className={styles['issue-title']}><span className={styles.thin}>#{issue.id}</span> {issue.title}</h2>
      {/* TODO: Show an SVG inside this. */}
      <div className={styles['issue-header']}>
        <div className={`${styles['issue-status']} ${issue.open ? styles.green : styles.red}`}>
          {issue.open ? 'Open' : 'Closed'}
        </div>
        <span className={styles.thin}>
          <b>{issue.author}</b> opened this issue on {date}{' '}
          • {comments || 'No'} comment{comments !== 1 ? 's' : ''}
        </span>
      </div>
      {/* <hr style={{ marginTop: '1em', marginBottom: '1em', color: '#eee', backgroundColor: '#eee' }} /> */}
      <div className={styles['issue-content']}>
        <div className={styles.replies}>
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
          {/* FIXME: auth && (reply UI) */}
        </div>
        <div className={styles.sidebar}>
          <div className={styles['sidebar-component'] + ' ' + styles['sidebar-label-component']}>
            <h4>Labels</h4>
            {renderedLabels.length ? renderedLabels : 'None'}
          </div>
          <div className={styles['sidebar-component']}>
            <h4>Assignees</h4>
            {issue.assignees.length
              ? issue.assignees.map(name => <span key={name}>{name}<br /></span>)
              : 'None'}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps (context: Ctx): Promise<Res<Props>> {
  const labels = await storageBackend.getLabels().catch(console.error) ?? []
  if (!context.params?.id || isNaN(+context.params.id)) return { props: { issue: null, labels } }
  let issue = await storageBackend.getIssue(+context.params.id).catch(console.error) ?? null
  if (issue?.hidden) issue = null
  return { props: { issue, labels } }
}

export default IssuePage
