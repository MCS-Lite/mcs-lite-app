import React, { Component } from 'react';
import { pure, compose } from 'recompose';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../../messages';

import styles from './styles.css';

class UploadJSONLink extends Component {
  inputFileOnChange = (e) => {
    const fr = new FileReader();
    const file = e.target.files[0];

    fr.onload = () => {
      this.props.onChange(fr.result);
    };

    if (file) {
      fr.readAsText(file);
    } else {
      this.props.pushToast({ kind: 'error', message: this.props.getMessages('errorWhenUploadJSON') });
    }
  }

  render() {
    const { getMessages: t } = this.props;

    return (
      <div className={styles.uploadJSONLink}>
        <a className={styles.link} onClick={() => this.fileInput.click()}>
          {t('browseAndUpload')}
        </a>
        <input
          type="file"
          accept=".json"
          ref={(c) => { this.fileInput = c; }}
          className={styles.fileInput}
          onChange={this.inputFileOnChange}
        />
      </div>
    );
  }
}

export default compose(
  pure,
  withGetMessages(messages, 'Dialogs'),
)(UploadJSONLink);
