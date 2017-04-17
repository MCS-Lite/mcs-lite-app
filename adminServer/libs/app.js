module.exports = {
  find: function(clients, clientId, clientSecret) {
    return new Promise(function(resolve, reject) {

      for (var i=0; i<clients.length; i ++) {
        if (clients[i].clientId == clientId && clients[i].secret == clientSecret) {
          return resolve({
            clientId: clientId,
            clientSecret: clients[i].secret,
          });
        }
      }
      return reject({ message: 'clientId / clientSecret is invalid.' });
    });
  },
};