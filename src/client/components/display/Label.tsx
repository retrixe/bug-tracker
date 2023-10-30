import React from 'react'
import type LabelType from '../../../shared/types/label'
import styles from './Label.module.scss'

const Label = ({ name, color, description }: LabelType): JSX.Element => {
  // TODO: Make this a link to add a filter for this label.
  return (
    <sub className={styles.tooltip} style={{ backgroundColor: color, borderColor: color }}>
      {name}
      <span className={styles.tooltiptext}>{description}</span>
    </sub>
  )
}

export default Label
