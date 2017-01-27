export const request = (url, method, data, token) => {
  let api;

  switch(method) {
    case 'GET':
      api = fetch(
        window.apiUrl + url,
        {
          method: method,
          headers: {
            "Authorization": "Bearer " + data,
            "Content-Type": "application/json",
          },
        }
      )
      break;
    default:
      api = fetch(
        window.apiUrl + url,
        {
          method: method,
          body: JSON.stringify(data),
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      break;

  }

  return api
  .then(checkStatus)
  .then(parseJSON)
}

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const parseJSON = (response) => {
  return response.json()
}
