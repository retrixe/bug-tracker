import type Reply from './reply'

// FIXME: Add create issue, label and reply UI
export default interface Issue {
  id: number
  open: boolean // FIXME: Make editable for logged in users
  locked: boolean // FIXME: Make editable for logged in users, currently not viewable
  hidden: boolean // FIXME: Make editable for logged in users
  title: string // FIXME: Make editable for logged in users
  author: string
  content: string // FIXME: Make editable for logged in users
  createdAt: number
  updatedAt: number // FIXME: Currently not viewable.
  labels: string[] // FIXME: Make editable for logged in users, currently not viewable.
  assignedTo: string[] // FIXME: Make editable for logged in users, currently not viewable.
  replies: Reply[] // FIXME: Make editable for logged in users, currently not viewable.
  // TODO: no projects or milestones rn
  // TODO: editLog: [],
}

export type IssueWithoutBody = Omit<Omit<Issue, 'content'>, 'replies'>
