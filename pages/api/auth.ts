import { type NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.authorization || typeof req.headers.authorization !== 'string') {
      return res.status(401).json({ error: 'No token provided!' })
    }
    const authState = await authBackend.validate(req.headers.authorization)
    if (authState === null) {
      return res.status(403).json({ error: 'Invalid token!' })
    }
    return res.status(200).json({ success: true, privileged: authState.privileged })
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
export default handler
