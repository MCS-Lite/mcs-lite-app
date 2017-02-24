module.exports = {
  type: 'object',
  properties: {
    deviceId: { type: 'string' },
    deviceKey: { type: 'string' },
    datachannelId: { type: 'string' },
    data: { type: 'any' },
    updatedAt: { type: 'integer' },
    createdAt: { type: 'integer' },
    isActive: { type: 'boolean' },
  },
  required: [
    'deviceId',
    'deviceKey',
    'datachannelId',
    'data',
    'updatedAt',
    'createdAt',
    'isActive',
  ],
};