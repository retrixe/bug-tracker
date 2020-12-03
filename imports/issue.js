import React from 'react'
import PropTypes from 'prop-types'
import AnchorLink from './anchorLink'

const Issue = ({ issue }) => {
  return (
    <div>
      <AnchorLink href={`/issue/${issue.id}`} prefetch={false}>{issue.title}</AnchorLink>
    </div>
  )
}
Issue.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    assignedTo: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    replies: PropTypes.arrayOf(PropTypes.shape({
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      action: PropTypes.oneOf(['reply', 'close', 'edit', 'titleEdit'])
    }).isRequired).isRequired
    // no projects or milestones rn
    // editLog: [], // maybe later
  }).isRequired
}

const IssueMemo = React.memo(Issue)
export default IssueMemo
