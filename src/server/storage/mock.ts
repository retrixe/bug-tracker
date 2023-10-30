import type StorageBackend from '.'
import { ValidationError } from '.'
import type Issue from '../../shared/types/issue'
import { type IssueBodyWithProps, type IssueWithoutContent } from '../../shared/types/issue'
import type Label from '../../shared/types/label'
import { ReplyAction } from '../../shared/types/reply'

const mockData: Issue[] = [
  {
    id: 1,
    open: true,
    hidden: false,
    locked: false,
    title: 'Open issue example',
    author: 'retrixe',
    content: '**Hello world!**',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    labels: ['bug', 'enhancement'],
    assignees: ['retrixe'],
    replies: [
      {
        action: ReplyAction.COMMENT,
        content: 'Hello, world! This is a reply...',
        author: 'retrixe',
        createdAt: Date.now()
      },
      {
        action: ReplyAction.EDIT_TITLE,
        content: 'Old example title\nOpen issue example',
        author: 'retrixe',
        createdAt: Date.now()
      },
      { action: ReplyAction.HIDE, content: '', author: 'retrixe', createdAt: Date.now() },
      { action: ReplyAction.UNHIDE, content: '', author: 'retrixe', createdAt: Date.now() },
      { action: ReplyAction.LOCKED, content: '', author: 'retrixe', createdAt: Date.now() },
      { action: ReplyAction.UNLOCKED, content: '', author: 'retrixe', createdAt: Date.now() },
      { action: ReplyAction.CLOSED, content: '', author: 'retrixe', createdAt: Date.now() },
      { action: ReplyAction.OPENED, content: '', author: 'retrixe', createdAt: Date.now() }
    ]
  }
]

const mockLabels: Label[] = [
  { name: 'bug', color: '#ed616f', description: 'Bugs and issues' },
  { name: 'enhancement', color: '#bed3e5', description: 'Enhancements and feature requests' }
]

export default class MockStorageBackend implements StorageBackend {
  async connect (): Promise<void> { /* NOOP */ }

  async getIssue (id: number): Promise<Issue | null> {
    return mockData.find(issue => issue.id === id) ?? null
  }

  async getIssues (includeHidden?: boolean): Promise<IssueWithoutContent[]> {
    return mockData.filter(issue => !!includeHidden || !issue.hidden).map(issue => {
      const { content, replies, ...rest } = issue
      return rest
    })
  }

  async getLabels (): Promise<Label[]> {
    return mockLabels
  }

  async createIssue (issue: IssueBodyWithProps): Promise<number> {
    const id = Math.max(...mockData.map(issue => issue.id)) + 1
    const newIssue = { ...issue, id, createdAt: Date.now(), updatedAt: Date.now(), replies: [] }
    if (issue.labels.some(name => !mockLabels.find(label => label.name === name))) {
      throw new ValidationError('Invalid label(s) specified!')
    } else if (issue.assignees.some(name => !['retrixe'].includes(name))) {
      throw new ValidationError('Invalid assignee(s) specified!')
    }
    mockData.push(newIssue)
    return id
  }
}
