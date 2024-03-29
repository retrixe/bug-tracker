import { type NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const id = req.query.id ? +req.query.id : NaN
      if (isNaN(id)) return res.status(200).json({ error: 'Invalid issue ID provided!' })
      const authState = await authBackend.validate(req.headers.authorization ?? '')
      let issue = await storageBackend.getIssue(id)
      if (issue?.hidden && !authState?.privileged) issue = null
      res.status(issue ? 200 : 404).json(issue ?? { error: 'This issue was not found!' })
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
export default handler
