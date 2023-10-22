enum ReplyAction {
  REPLY = 'reply',
  CLOSE = 'close',
  EDIT = 'edit',
  TITLE_EDIT = 'titleEdit'
}

export default interface Reply {
  author: string
  content: string
  timestamp: number
  action: ReplyAction
}
