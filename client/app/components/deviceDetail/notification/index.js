import { compose } from 'recompose';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';
import Notification from './Notification';

export default compose(
  withGetMessages(messages, 'Notification'),
)(Notification);
