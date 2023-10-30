import type StorageBackend from '.'
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
    assignedTo: ['retrixe'],
    replies: [
      {
        action: ReplyAction.COMMENT,
        content: 'Hello, world! This is a reply...',
        author: 'retrixe',
        createdAt: Date.now()
      }
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
    // FIXME: Validate labels and assignedTo
    mockData.push(newIssue)
    return id
  }
}
