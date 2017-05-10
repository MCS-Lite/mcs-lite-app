import types from '../constants/loginTypes';

const getQuery =  function(name) {
  var match;
  var pl     = /\+/g; /* Regex for replacing addition symbol with a space */
  var search = /([^&=]+)=?([^&]*)/g;
  var query  = window.location.search.substring(1);
  var decode = function(s) {
    return decodeURIComponent(s.replace(pl, ' '));
  };

  var urlParams = {};
  while (match = search.exec(query)) {
    urlParams[decode(match[1])] = decode(match[2]);
  }

  return urlParams[name];
};

export const detectErrorMsg =  (aaa) => (dispatch) => {
  const msg = getQuery('errorMsg');
  if (msg) {
    return dispatch({
      type: types.ERRORMSG,
      errorMsg: msg
    });
  }
}