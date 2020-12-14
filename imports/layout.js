import React from 'react'
import PropTypes from 'prop-types'
import useAuth from './useAuth'
import AnchorLink from './anchorLink'

const Layout = (props) => {
  const auth = useAuth()
  const logout = () => {
    const token = localStorage.getItem('token')
    fetch('/api/logout', { headers: { authorization: token }, method: 'POST' })
      .then(req => req.ok && window.location.reload())
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
Layout.propTypes = {
  children: PropTypes.node.isRequired
}

const LayoutMemo = React.memo(Layout)
export default LayoutMemo
