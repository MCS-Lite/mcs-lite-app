module.exports = {
  type: 'object',
  properties: {
    prototypeName: { type: 'string' },
    prototypeDescription: { type: 'string' },
    prototypeImageURL: { type: 'string' },
    version: { type: 'string' },
    isPublic: { type: 'boolean' },
    datachannels: { type: 'array' },
  },
  required: [
    'prototypeName',
    'prototypeDescription',
    'prototypeImageURL',
    'version',
    'isPublic',
    'isActive',
    'datachannels',
  ],
};