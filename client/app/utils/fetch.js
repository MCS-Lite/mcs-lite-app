export const request = (url, method, data, token) => {
  return fetch(
    window.apiUrl + url,
    {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
    }
  )
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
