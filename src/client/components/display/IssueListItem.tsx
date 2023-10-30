import React from 'react'
import { DateTime } from 'luxon'
import UnstyledLink from '../layout/UnstyledLink'
import Label from './Label'
import { type IssueWithoutBody } from '../../../shared/types/issue'
import type LabelType from '../../../shared/types/label'
import styles from './IssueListItem.module.scss'

const issueSvgPath = 'M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 ' +
  '3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z'

const IssueListItem = ({ issue, labels }: { issue: IssueWithoutBody, labels: LabelType[] }): JSX.Element => {
  const createdAt = DateTime.fromMillis(issue.createdAt).toLocaleString(DateTime.DATE_MED)
  const updatedAt = DateTime.fromMillis(issue.updatedAt).toLocaleString(DateTime.DATE_MED)
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <svg viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true' fill='rgb(34, 134, 58)'>
          <path fillRule='evenodd' d={issueSvgPath} />
        </svg>
        <div className={styles.titleSpacer} />
        <UnstyledLink href={`/issue/${issue.id}`} prefetch={false}>
          <b>{issue.title}</b>
        </UnstyledLink>
        {issue.labels.map(label => {
          const labelObj = labels.find(l => l.name === label)
          if (!labelObj) return null
          return <Label key={label} {...labelObj} />
        })}
      </div>
      <sub>#{issue.id} opened on {createdAt} by {issue.author} • Updated on {updatedAt}</sub>
    </div>
  )
}

export default IssueListItem
