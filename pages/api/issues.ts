import { type NextApiHandler } from 'next'
import { createStorageBackend } from '../../src/server/storage'
import type Issue from '../../src/shared/types/issue'

// On startup, initialise storage backend.
export const initialiseStorageBackend = async (): Promise<void> => {
  if (!global.storageBackend) {
    global.storageBackend = createStorageBackend()
  }
  await global.storageBackend.connect()
}

export const getIssues = async (includeHidden = false): Promise<Issue[]> => {
  await initialiseStorageBackend()
  return await global.storageBackend.getIssues(includeHidden)
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // TODO: Support confidential issues for privileged logged in users.
      const issues = await getIssues()
      res.status(200).json(issues)
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
export default handler
