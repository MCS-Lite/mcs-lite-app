module.exports = {
  type: 'object',
  properties: {
    prototypeId: { type: 'string' },
    datachannelId: { type: 'string' },
    datachannelTypeId: { type: 'integer' },
    config: { type: 'any' },
    updatedAt: { type: 'integer' },
    createdAt: { type: 'integer' },
    isActive: { type: 'boolean' },
  },
};