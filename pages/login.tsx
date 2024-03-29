import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../src/client/components/layout/Layout'
import Metadata from '../src/client/components/layout/Metadata'
import api from '../src/client/hooks/api'
import AuthContext from '../src/client/hooks/authContext'

const Login = (): JSX.Element => {
  const auth = useContext(AuthContext)
  const router = useRouter()
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    event => setUsername(event.target.value)
  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    event => setPassword(event.target.value)

  const setToken = (token: string): void => {
    localStorage.setItem('bug-tracker:token', token)
    router.push('/').catch(console.error)
  }
  const login = (): void => {
    api.post('login', { json: { username, password }, throwHttpErrors: false })
      .json<{ error?: string, token?: string }>()
      .then(e => (e.error ? setError(e.error) : setToken(e.token ?? '')))
      .catch(() => setError('An unknown error occurred while logging in. Are you online?'))
  }

  useEffect(() => {
    if (auth) router.push('/').catch(console.error)
  }, [auth, router])

  // FIXME: Awful, needs an input and button design (so do other parts of the UI)
  return (
    <Layout>
      <Metadata title='Login - Bug Tracker' url='/login' description='Log into this bug tracker.' />
      <input placeholder='Username' value={username} onChange={onUsernameChange} />
      <br />
      <input placeholder='Password' value={password} onChange={onPasswordChange} type='password' />
      <br />
      <button style={{ width: 185 }} onClick={login}>Login</button>
      {error && <><br /><span style={{ color: 'red' }}>{error}</span></>}
    </Layout>
  )
}

export default Login
