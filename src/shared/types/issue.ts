import type Reply from './reply'

// TODO: Add create issue UI
export default interface Issue {
  id: number
  open: boolean // TODO: Make editable for logged in users
  locked: boolean // TODO: Make editable for logged in users, not respected or viewable, no reply action.
  hidden: boolean // TODO: Make editable for logged in users, not respected, no reply action.
  title: string // TODO: Make editable for logged in users
  author: string
  content: string // TODO: Make editable for logged in users
  timestamp: number
  labels: string[] // TODO: Make editable for logged in users, not viewable.
  assignedTo: string[] // TODO: Make editable for logged in users, not viewable.
  replies: Reply[] // TODO: Make editable for logged in users, not viewable.
  // TODO: no projects or milestones rn
  // TODO: editLog: [],
}
