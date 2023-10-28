import React from 'react'
import api from './hooks/api'
import useAuth from './hooks/useAuth'
import AnchorLink from './anchorLink'

const Layout = (props: React.PropsWithChildren<Record<string, unknown>>): JSX.Element => {
  const auth = useAuth()
  const logout = (): void => {
    api.post('logout').then(window.location.reload).catch(console.error)
  }
  return (
    <div>
      <div style={{ borderBottom: '2px solid black', padding: '8px', display: 'flex', alignItems: 'center' }}>
        <h1><AnchorLink href='/'>Bug Tracker</AnchorLink></h1>
        <div style={{ flex: 1 }} />
        <h4>
          {auth
            ? <span onClick={logout} style={{ cursor: 'pointer' }}>Logout</span>
            : <AnchorLink href='/login'>Login</AnchorLink>}
        </h4>
      </div>
      <style jsx global>{'body{margin:0;font-family: "Open Sans", sans-serif;}'}</style>
      <div style={{ margin: '8px' }}>
        {props.children}
      </div>
    </div>
  )
}

const LayoutMemo = React.memo(Layout)
export default LayoutMemo
