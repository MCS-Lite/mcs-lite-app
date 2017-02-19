import React from 'react'
import { FormattedMessage } from 'react-intl'

import compose from 'recompose/compose'
import pure from 'recompose/pure'

import CopyButton from 'mtk-ui/lib/CopyButton'

import styles from './copyButtonGroup.css'

const enhance = compose(
  pure,
)

const copyButtonGroup = ({ label, value }) => (
  <div className={styles.base}>
    {label && <span className={styles.label}>{label}:</span>}
    <input
      value={value}
      type="text"
      readOnly
      className={styles.input}
    />
    <CopyButton text={() => value}>
      <FormattedMessage
        id="CopyButtonGroup.ButtonText"
        defaultMessage="複製"
      />
    </CopyButton>
  </div>
)

export default copyButtonGroup
