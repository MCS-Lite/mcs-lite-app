import React from 'react';
import { compose, pure } from 'recompose';

const Login = () => (
  <div>
    This is app content.
  </div>
);

export default compose(
  pure,
)(Login);
