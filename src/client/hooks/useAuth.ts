import { useEffect, useState } from 'react'
import { HTTPError } from 'ky'
import api from './api'

interface AuthState {
  authenticated: boolean
  privileged: boolean
}

const useAuth = (): AuthState | null => {
  const [authenticated, setAuthenticated] = useState<AuthState | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    api('auth').json<{ success: boolean, privileged: boolean }>()
      .then(({ privileged }) => setAuthenticated({ authenticated: true, privileged }))
      .catch((err: unknown) => {
        if (err instanceof HTTPError && err.response.status === 403) {
          setAuthenticated({ authenticated: false, privileged: false })
        } else console.error(err)
      })
  }, [])

  return authenticated
}

export default useAuth
