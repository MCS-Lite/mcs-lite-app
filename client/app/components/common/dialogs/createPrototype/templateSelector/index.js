import React from 'react';
import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { T } from 'ramda';
import InputSelect from 'mtk-ui/lib/InputSelect';
import InputForm from 'mtk-ui/lib/InputForm';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../../messages';

import styles from './styles.css';

const TemplateSelector = ({
  inputSelectItems = [],
  value,
  onChange,
  getMessages: t,
}) => (
  <InputForm
    kind="horizontal"
    className={styles.form}
  >
    <InputSelect
      placeholder={t('selectExample')}
      items={inputSelectItems}
      value={value}
      label={t('selectExample')}
      filterFunc={T}
      onChange={onChange}
      className={styles.input}
    />
  </InputForm>
);

export default compose(
  pure,
  withGetMessages(messages, 'Dialogs'),
  withPropsOnChange(['templates'], ({ templates = []}) => ({
    inputSelectItems: templates.map(prototype => ({
      value: prototype,
      children: prototype.prototypeName,
    })),
  })),
  withHandlers({
    onChange: props => (e, value) => {
      props.setTemplate(value);
      props.setSelectedTemplateName(value.prototypeName);
    },
  }),
)(TemplateSelector);
