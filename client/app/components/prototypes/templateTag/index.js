import { compose, pure } from 'recompose';
import { withGetMessages } from 'react-intl-inject-hoc';
import TemplateTag from './templateTag';
import messages from '../messages';

export default compose(pure, withGetMessages(messages, 'Prototypes'))(
  TemplateTag,
);
