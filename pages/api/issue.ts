import { type NextApiHandler } from 'next'
import { type IssueBody } from '../../src/shared/types/issue'
import { ValidationError } from '../../src/server/storage'

const validateIssueBody = (body: any): body is IssueBody => {
  return typeof body.title === 'string' && !body.title.includes('\n') && body.title.length <= 100 &&
    typeof body.content === 'string' && body.content.length <= 4000 &&
    Array.isArray(body.labels) &&
    Array.isArray(body.assignedTo)
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const authState = await authBackend.validate(req.headers.authorization ?? '')
      if (authState === null) {
        return res.status(401).json({ error: 'Unauthorized!' })
      }

      const body = req.body
      if (!validateIssueBody(body)) {
        return res.status(400).json({ error: 'Invalid issue body!' })
      }
      const id = await storageBackend.createIssue({
        ...body,
        ...(authState.privileged ? {} : { labels: [], assignedTo: [] }),
        open: false,
        locked: false,
        hidden: false,
        author: authState.username
      })
      res.status(200).json({ id })
    } catch (e) {
      if (e instanceof ValidationError) {
        res.status(400).json({ error: e.message })
      } else {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error!' })
      }
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
export default handler
