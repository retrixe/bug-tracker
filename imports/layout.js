import React from 'react'
import PropTypes from 'prop-types'

const Layout = (props) => (
  <div>
    <div style={{ borderBottom: '2px solid black', padding: '8px' }}>
      <h1>Bug Tracker</h1>
    </div>
    <style jsx global>{'body{margin:0;font-family: "Open Sans", sans-serif;}'}</style>
    <div style={{ margin: '8px' }}>
      {props.children}
    </div>
  </div>
)
Layout.propTypes = {
  children: PropTypes.node.isRequired
}

const LayoutMemo = React.memo(Layout)
export default LayoutMemo
