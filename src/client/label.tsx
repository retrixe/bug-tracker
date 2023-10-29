import React from 'react'
import type LabelType from '../shared/types/label'

const Label = ({ name, color, description }: LabelType): JSX.Element => {
  // TODO: description
  return (
    <sub
      style={{
        backgroundColor: color,
        border: '1px solid ' + color,
        marginLeft: 8,
        padding: 2,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 16
      }}
    >
      {name}
    </sub>
  )
}

export default Label
