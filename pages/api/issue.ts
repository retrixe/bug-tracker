import { type NextApiHandler } from 'next'
import { type IssueBody } from '../../src/shared/types/issue'
import { decodeToken } from '../../src/server/auth'

const validateIssueBody = (body: any): body is IssueBody => {
  // FIXME: Enforce limitations like character length, newlines
  return typeof body.title === 'string' &&
    typeof body.content === 'string' &&
    Array.isArray(body.labels) &&
    Array.isArray(body.assignedTo)
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { username } = decodeToken(req.headers.authorization ?? '') ?? {}
      if (!username) return res.status(401).json({ error: 'Unauthorized!' })
      const privileged = await authBackend.validate(req.headers.authorization ?? '')
      if (privileged === null) {
        return res.status(401).json({ error: 'Unauthorized!' })
      }

      const body = req.body
      if (!validateIssueBody(body)) {
        return res.status(400).json({ error: 'Invalid issue body!' })
      }
      const id = await storageBackend.createIssue({
        ...body,
        ...(privileged ? {} : { labels: [], assignedTo: [] }),
        open: false,
        locked: false,
        hidden: false,
        author: username
      })
      res.status(200).json({ id })
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
export default handler
