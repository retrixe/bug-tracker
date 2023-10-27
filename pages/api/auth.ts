import { type NextApiHandler } from 'next'
import { createAuthBackend } from '../../src/server/auth'

// On startup, initialise auth backend.
export const initialiseAuthBackend = async (): Promise<void> => {
  if (!global.authBackend) {
    global.authBackend = createAuthBackend()
  }
  await global.authBackend.connect()
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    await initialiseAuthBackend()

    if (!req.headers.authorization || typeof req.headers.authorization !== 'string') {
      return res.status(401).json({ error: 'No token provided!' })
    }
    const userInfo = await authBackend.validate(req.headers.authorization)
    if (!userInfo) {
      return res.status(403).json({ error: 'Invalid token!' })
    }
    return res.status(200).json({ success: true, privileged: userInfo[1] })
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
export default handler
