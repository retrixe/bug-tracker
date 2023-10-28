import { type NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const privileged = await authBackend.validate(req.headers.authorization ?? '')
      const issues = await storageBackend.getIssues(privileged ?? false)
      res.status(200).json(issues)
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
export default handler
