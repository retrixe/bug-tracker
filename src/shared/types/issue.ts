import type Reply from './reply'

export default interface Issue {
  id: number
  open: boolean
  hidden: boolean
  title: string
  author: string
  content: string
  timestamp: number
  labels: string[]
  assignedTo: string[]
  replies: Reply[]
  // TODO: locked and limited to collaborators
  // TODO: no projects or milestones rn
  // TODO: editLog: [],
}
