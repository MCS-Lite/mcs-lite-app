export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const parseJSON = response => response.json();

export const request = (url, method, data, token) => {
  let api;

  switch (method) {
    case 'GET':
      api = fetch(
        window.apiUrl + url,
        {
          method,
          headers: {
            Authorization: `Bearer ${data}`,
            'Content-Type': 'application/json',
          },
        },
      );
      break;
    case 'POST_FORM_DATA':
      api = fetch(
        window.apiUrl + url,
        {
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      break;
    case 'GET_DATAPOINTS':
      api = fetch(
        window.apiUrl + url,
        {
          method: 'GET',
          headers: {
            deviceKey: data,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      break;
    default:
      api = fetch(
        window.apiUrl + url,
        {
          method,
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      break;

  }

  return api
  .then(checkStatus)
  .then(parseJSON);
};

export const requestOauth = (url, method, data, token) => {
  let api;

  switch (method) {
    case 'GET':
      api = fetch(
        window.oauthUrl + url,
        {
          method,
          headers: {
            Authorization: `Bearer ${data}`,
            'Content-Type': 'application/json',
          },
        },
      );
      break;
    default:
      api = fetch(
        window.oauthUrl + url,
        {
          method,
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      break;

  }

  return api
  .then(checkStatus)
  .then(parseJSON);
};
