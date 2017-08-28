import { compose, pure, withProps } from 'recompose';
import { pipe, find, propEq, prop } from 'ramda';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../../messages';
import MethodSelector from './methodSelector';

export default compose(
  pure,
  withGetMessages(messages, 'Dialogs'),
  withProps((props) => {
    const options = [
      { value: 'new', children: props.getMessages('inputPrototypeInfo') },
      { value: 'json', children: props.getMessages('importJSON') },
      { value: 'clone', children: props.getMessages('useExample') },
    ];

    return {
      options,
      valueRenderer: value => pipe(
        find(propEq('value', value)),
        prop('children'),
      )(options),
    };
  }),
)(MethodSelector);
