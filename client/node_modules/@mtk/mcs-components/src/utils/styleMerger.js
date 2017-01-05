import assign from 'lodash.assign';

export default function() {
  return assign({}, ...arguments);
}
