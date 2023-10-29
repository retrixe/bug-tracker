import type StorageBackend from '.'
import type Issue from '../../shared/types/issue'

const mockData = [
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
    labels: [],
    assignedTo: [],
    replies: []
  }
]

export default class MockStorageBackend implements StorageBackend {
  async connect (): Promise<void> { /* NOOP */ }

  async getIssue (id: number): Promise<Issue | null> {
    return mockData.find(issue => issue.id === id) ?? null
  }

  async getIssues (includeHidden?: boolean): Promise<Issue[]> {
    return mockData.filter(issue => !!includeHidden || !issue.hidden)
  }

  async getLabels (): Promise<Label[]> {
    return [
      { name: 'bug', color: '#ed616f', description: 'Bugs and issues' },
      { name: 'enhancement', color: '#bed3e5', description: 'Enhancements and feature requests' }
    ]
  }
}
