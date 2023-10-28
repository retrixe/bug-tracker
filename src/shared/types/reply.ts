export enum ReplyAction {
  COMMENT = 'comment',
  EDIT_TITLE = 'editTitle',
  HIDE_UNHIDE = 'hideUnhide',
  LOCK_UNLOCK = 'lockUnlock',
  OPEN_CLOSE = 'openClose',
}

export default interface Reply {
  author: string
  content: string
  timestamp: number
  action: ReplyAction
}
