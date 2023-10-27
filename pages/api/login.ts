import { type NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      if (!req.body?.username || !req.body.password) {
        return res.status(400).json({
          error: 'Invalid body! Make sure to have a username/password in JSON with ' +
            'Content-Type application/json.'
        })
      }
      const token = await authBackend.login(req.body.username, req.body.password)
      if (!token) {
        return res.status(401).json({ error: 'Invalid credentials have been provided!' })
      }
      return res.status(200).json({ token }) // TODO: Consider using cookies.
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  } else res.status(405).json({ error: 'Method Not Allowed!' })
}
export default handler
