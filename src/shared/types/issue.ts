import type Reply from './reply'

// FIXME: Add create issue UI
export default interface Issue {
  id: number
  open: boolean // FIXME: Make editable for logged in users
  locked: boolean // FIXME: Make editable for logged in users, show locked icon like GitLab
  hidden: boolean // FIXME: Make editable for logged in users, show hidden icon like GitLab
  title: string // FIXME: Make editable for logged in users
  author: string
  content: string // FIXME: Make editable for logged in users
  createdAt: number
  updatedAt: number
  labels: string[] // FIXME: Make editable for logged in users
  assignedTo: string[] // FIXME: Make editable for logged in users
  replies: Reply[]
  // TODO: no projects or milestones rn
  // TODO: editLog: [],
}

// Expected by POST /api/issue
export type IssueBody = Pick<Issue, 'title' | 'content' | 'labels' | 'assignedTo'>

// Expected by storage backend, id/replies/createdAt/updatedAt are handled by the backend
export type IssueBodyWithProps = IssueBody & Pick<Issue, 'open' | 'locked' | 'hidden' | 'author'>

export type IssueWithoutContent = Omit<Omit<Issue, 'content'>, 'replies'>
