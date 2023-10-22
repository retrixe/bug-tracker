import React from 'react'
import { DateTime } from 'luxon'
import AnchorLink from './anchorLink'
import type IssueType from '../shared/types/issue'

const issueSvgPath = 'M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 ' +
  '3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z'

const Issue = ({ issue }: { issue: IssueType }): JSX.Element => {
  const date = DateTime.fromMillis(issue.timestamp).toLocaleString(DateTime.DATE_MED)
  return (
    <div style={{ borderBottom: '1px solid black', paddingBottom: 8 }}>
      <svg viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true' fill='rgb(34, 134, 58)'>
        <path fillRule='evenodd' d={issueSvgPath} />
      </svg>
      <AnchorLink href={`/issue/${issue.id}`} prefetch={false}><b> {issue.title}</b></AnchorLink>
      <br />
      <sub>#{issue.id} opened on {date} by {issue.author}</sub>
    </div>
  )
}

const IssueMemo = React.memo(Issue)
export default IssueMemo
