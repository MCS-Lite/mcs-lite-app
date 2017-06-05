import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const TemplateTag = ({ getMessages: t }) => (
  <div className={styles.isTemplateTag}>{t('prototypeTemplate')}</div>
);

TemplateTag.propTypes = {
  getMessages: PropTypes.func,
};

export default TemplateTag;
