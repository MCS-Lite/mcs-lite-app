module.exports = {
  type: 'object',
  properties: {
    prototypeId: { type: 'string' },
    prototypeKey: { type: 'string' },
    prototypeName: { type: 'string' },
    prototypeDescription: { type: 'string' },
    prototypeImageURL: { type: 'string' },
    createdUserId: { type: 'string' },
    version: { type: 'string' },
    display: { type: 'array' },
    isPublic: { type: 'boolean' },
    isActive: { type: 'boolean' },
    isTemplate: { type: 'boolean' },
  },
};


  // {
  //   "prototypeId": String,
  //   "prototypeKey": String,
  //   "prototypeName": String,
  //   "prototypeDescription": String,
  //   "prototypeImageURL": String,
  //   "createdUserId": String,
  //   "prototypeId": String,
  //   "version": String,
  //   "display": [ // Array
  //     {

  //     }
  //   ],
  //   "updatedAt": Int,
  //   "createdAt": Int,
  //   "isPublic": Boolean,
  // }