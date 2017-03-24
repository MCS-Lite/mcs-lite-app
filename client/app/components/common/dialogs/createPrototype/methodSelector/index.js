import React from 'react';
import { compose, pure, withProps } from 'recompose';
import { pipe, find, propEq, prop, T } from 'ramda';
import InputForm from 'mtk-ui/lib/InputForm';
import InputSelect from 'mtk-ui/lib/InputSelect';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../../messages';

import styles from './styles.css';

const MethodSelector = (
  {
    options,
    valueRenderer,
    getMessages: t,
    value,
    onChange,
  }
) => (
  <InputForm
    kind="horizontal"
    style={{ backgroundColor: 'white' }}
    className={styles.form}
  >
    <InputSelect
      placeholder={t('inputPrototypeInfo')}
      items={options}
      value={value}
      label={t('prototypeName')}
      filterFunc={T}
      valueRenderer={valueRenderer}
      onChange={onChange}
      className={styles.input}
    />
  </InputForm>
);

export default compose(
  pure,
  withGetMessages(messages, 'Dialogs'),
  withProps(props => {
    const options = [
      { value: 'new', children: props.getMessages('inputPrototypeInfo') },
      { value: 'json', children: props.getMessages('importJSON') },
      { value: 'clone', children: props.getMessages('useExample') },
    ];

    return {
      options,
      valueRenderer: value =>
        pipe(find(propEq('value', value)), prop('children'))(options),
    };
  })
)(MethodSelector);
