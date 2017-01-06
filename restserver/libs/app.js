module.exports = {
  find: function(clients, clientId, clientSecret) {
    return new Promise(function(resolve, reject) {
      if (clients.hasOwnProperty(clientId) && clients[clientId].secret === clientSecret) {
        return resolve({
          clientId: clientId,
          clientSecret: clients[clientId].secret,
        });
      } else {
        return reject({ message: 'clientId / clientSecret is invalid.' });
      }
    });
  },
};