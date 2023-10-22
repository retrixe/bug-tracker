import { type NextApiHandler } from 'next'
import { initialiseDb } from '../issues'
import type Issue from '../../../src/shared/types/issue'

export const getIssue = async (id: number): Promise<Issue | undefined> => {
  await initialiseDb()
  const issue = await db.collection('issues').findOne<Issue>({ id })
  if (!issue) return
  return issue
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const id = req.query.id ? +req.query.id : NaN
      if (isNaN(id)) return res.status(200).json({ error: 'Invalid issue ID provided!' })
      const issue = await getIssue(id)
      res.status(issue ? 200 : 404).json(issue ?? { error: 'This issue was not found!' })
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
export default handler
