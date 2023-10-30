import React from 'react'
import type LabelType from '../shared/types/label'
import styles from './label.module.css'

const Label = ({ name, color, description }: LabelType): JSX.Element => {
  // TODO: Make this a link to add a filter for this label.
  return (
    <sub
      className={styles.tooltip}
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
      <span className={styles.tooltiptext}>{description}</span>
    </sub>
  )
}

export default Label
