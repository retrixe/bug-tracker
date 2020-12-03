import React from 'react'
import gfm from 'remark-gfm'
import unified from 'unified'
import parse from 'remark-parse'
import { DateTime } from 'luxon'
import PropTypes from 'prop-types'
import remark2react from 'remark-react'
import Title from '../../imports/title'
import Layout from '../../imports/layout'

import { getIssue } from '../api/issue/[id]'

const Reply = (props) => {
  const content = React.useMemo( // TODO: Get rid of <p> top and bottom margins.
    () => unified().use(parse).use(gfm).use(remark2react).processSync(props.content).result,
    [props.content]
  )
  return (
    <div style={{ marginTop: '1.5em' }}>
      <div style={{
        padding: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#eee',
        border: '1px solid black',
        borderBottomColor: '#999'
      }}>
        <b>{props.author}</b> commented on {props.date}
      </div>
      <div style={{
        padding: 8,
        paddingLeft: '1em',
        paddingRight: '1em',
        border: '1px solid black',
        borderTop: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
      }}>
        {content}
      </div>
    </div>
  )
}
Reply.propTypes = {
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

const IssuePage = ({ issue }) => {
  const comments = React.useMemo(
    () => issue && issue.replies.filter(reply => reply.action === 'reply').length, [issue]
  )
  if (!issue) {
    return (
      <Layout>
        <Title title='Issue Not Found - Bug Tracker' url='/' description='A lightweight website that tracks bugs.' />
        <p>This issue was not found! Go back to the home page?</p>
      </Layout>
    )
  }
  // TODO: labels, assignedTo, close, edit, titleEdit
  const date = DateTime.fromMillis(issue.timestamp).toLocaleString(DateTime.DATE_MED)
  return (
    <Layout>
      <Title title='Bug Tracker' url='/' description='A lightweight website that tracks bugs.' />
      <h2><span style={{ fontWeight: 300 }}>#{issue.id}</span> {issue.title}</h2>
      <div style={{
        padding: 8,
        color: 'white',
        marginRight: 8,
        borderRadius: 16,
        display: 'inline',
        backgroundColor: issue.open ? 'green' : 'red'
      }}>
        {issue.open ? 'Open' : 'Closed'}
      </div>
      <span style={{ fontWeight: 300 }}>
        <b>{issue.author}</b> opened this issue on {date} · {comments} comment{comments.length > 1 ? 's' : ''}
      </span>
      {/* <hr style={{ marginTop: '1em', marginBottom: '1em', color: '#eee', backgroundColor: '#eee' }} /> */}
      <Reply date={date} content={issue.content} author={issue.author} />
      {issue.replies.map((reply, index) => (
        <Reply
          key={index}
          date={DateTime.fromMillis(reply.timestamp).toLocaleString(DateTime.DATE_MED)}
          author={reply.author}
          content={reply.content}
        />
      ))}
    </Layout>
  )
}
IssuePage.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    assignedTo: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    replies: PropTypes.arrayOf(PropTypes.shape({
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      action: PropTypes.oneOf(['reply', 'close', 'edit', 'titleEdit'])
    }).isRequired).isRequired
    // no projects or milestones rn
    // editLog: [], // maybe later
  })
}

export async function getServerSideProps (context) {
  if (!context.params || !context.params.id || isNaN(context.params.id)) return { props: {} }
  let issue
  try { issue = await getIssue(+context.params.id) } catch (e) { console.error(e) }
  return { props: { issue: issue ?? null } }
}

export default IssuePage
