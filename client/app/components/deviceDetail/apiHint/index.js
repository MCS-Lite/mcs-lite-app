import { compose } from 'recompose';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';
import ApiHint from './ApiHint';

export default compose(withGetMessages(messages, 'ApiHint'))(ApiHint);
