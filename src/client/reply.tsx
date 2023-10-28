import React from 'react'
import { unified } from 'unified'
import rehypeReact from 'rehype-react'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import styles from './reply.module.css'
import type ReplyType from '../shared/types/reply'

import * as prod from 'react/jsx-runtime'
import { ReplyAction } from '../shared/types/reply'

// @ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs }

type ReplyActionProps = Omit<ReplyType, 'timestamp'> & { date: string }

export const ReplyComment = (props: Omit<ReplyActionProps, 'action'>): JSX.Element => {
  const content = React.useMemo(
    () => unified()
      .use(remarkParse, { fragment: true })
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeReact, production)
      .processSync(props.content)
      .result,
    [props.content]
  )
  return (
    <div style={{ marginTop: '1.5em' }}>
      <div
        style={{
          padding: 8,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          backgroundColor: '#eee',
          border: '1px solid black',
          borderBottomColor: '#999'
        }}
      >
        <b>{props.author}</b> commented on {props.date}
      </div>
      <div
        style={{
          padding: 8,
          border: '1px solid black',
          borderTop: 0,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8
        }}
        className={styles['markdown-content']}
      >
        {content}
      </div>
    </div>
  )
}

const Reply = (props: ReplyActionProps): JSX.Element => {
  if (props.action === ReplyAction.COMMENT) {
    return <ReplyComment {...props} />
  }
  return (
    <div style={{ marginTop: '1.5em', display: 'flex' }}>
      {props.action === ReplyAction.OPEN_CLOSE && (
        <span><b>{props.author}</b> {props.content} this issue on {props.date}</span>
      )}
      {props.action === ReplyAction.HIDE_UNHIDE && (
        <span><b>{props.author}</b> {props.content} this issue on {props.date}</span>
      )}
      {props.action === ReplyAction.LOCK_UNLOCK && (
        <span><b>{props.author}</b> {props.content} this issue on {props.date}</span>
      )}
      {props.action === ReplyAction.EDIT_TITLE && (
        <span>
          <b>{props.author}</b> edited the title of this issue on {props.date} from
          <b> {props.content.split('\n')[0]}</b> to <b>{props.content.split('\n')[1]}</b>
        </span>
      )}
      {/* <div style={{ backgroundColor: '#aaa', width: '100%', height: 4 }} /> */}
    </div>
  )
}

export default Reply
