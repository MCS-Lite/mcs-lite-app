module.exports = {
  type: 'object',
  properties: {
    deviceId: { type: 'string' },
    deviceKey: { type: 'string' },
    datachannelId: { type: 'string' },
    timestamp: { type: 'integer' },
    data: { type: 'any' },
    updatedAt: { type: 'integer' },
    createdAt: { type: 'integer' },
    isActive: { type: 'boolean' },
  },
};