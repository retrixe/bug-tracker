import { useEffect, useState } from 'react'

/**
 * @return {null|boolean} true if authenticated, false if not, null if uncertain.
 */
const useAuth = (): boolean | null => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    (async () => {
      if (typeof window === 'undefined') return
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const req = await fetch('/api/auth', { headers: { authorization: token } })
        if (req.ok) setAuthenticated(true)
        else setAuthenticated(false)
      } catch (e) {}
    })().catch(console.error)
  }, [])

  return authenticated
}

export default useAuth
