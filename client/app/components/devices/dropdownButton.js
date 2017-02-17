import React from 'react'
import c from 'classnames'
import { FormattedMessage } from 'react-intl'
import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert'
import Menu from 'mtk-ui/lib/Menu';

import styles from './dropdownButton.css'

class DropdownButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuShow: false,
    }
  }

  onClick = () => {
    this.setState({ isMenuShow: !this.state.isMenuShow})
  }

  render() {
    const {
      className
    } = this.props;

    const items = [
      {
        value: 'edit',
        children: <FormattedMessage
          id="DeviceCard.Edit"
          defaultMessage="Edit"
        />
      },
      {
        value: 'delete',
        children: <FormattedMessage
          id="DeviceCard.Delete"
          defaultMessage="Delete"
        />
      },
    ];

    return (
      <div className={c(className, styles.base)} onClick={this.onClick}>
        <IconMoreVert />
        {
          this.state.isMenuShow &&
          <Menu
            className={styles.menu}
            items={items}
          />
        }
      </div>
    )
  }
}

export default DropdownButton
