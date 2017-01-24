var request = require('superagent');
export function login(email:String, password: String) {

  fetch(window.apiUrl + '/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic MTAwMDAwMDAwMDAwMDAwMDAwMTptY3NfbGl0ZV9hcHBfc2VjcmV0',
      },
      body: new FormData({
        email: email,
        password: password,
        grant_type: 'password'
      })
  })
  // request
  //   .post(window.apiUrl + '/oauth/token')
  //   .set('Authorization', 'Basic ' + basic_token)
  //   .send('email=' + email)
  //   .send('password=' + password)
  //   .send('grant_type=password')
  //   .end(function(err, data) {
  //     console.log(err)
  //     console.log(data)
  //   });
  // return request(window.apiUrl)
  // .post('/oauth/token')
  // .set('Content-Type', 'application/x-www-form-urlencoded')
  // .set('Authorization', 'Basic ' + basic_token)
  // .send({
  //   email: email,
  //   password: password,
  //   grant_type: 'password'
  // })
  // .then(function(data) {
  //   console.log(data);
  // });
}