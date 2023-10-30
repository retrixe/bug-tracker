export enum ReplyAction {
  COMMENT = 'comment',
  EDIT_TITLE = 'editTitle',
  HIDE = 'hide',
  UNHIDE = 'unhide',
  LOCKED = 'locked',
  UNLOCKED = 'unlocked',
  OPENED = 'opened',
  CLOSED = 'closed'
}

export default interface Reply {
  author: string
  // When COMMENT, content is the comment content
  // When EDIT_TITLE, content is "old title\nnew title"
  // Otherwise, the content is empty.
  content: string
  createdAt: number
  action: ReplyAction
}
