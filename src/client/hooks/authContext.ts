import { createContext } from 'react'

export interface AuthState {
  authenticated: boolean
  privileged: boolean
}

const AuthContext = createContext<AuthState | null>(null)

export default AuthContext
