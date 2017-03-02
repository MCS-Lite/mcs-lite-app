module.exports = {
  type: 'object',
  properties: {
    deviceId: { type: 'string' },
    deviceKey: { type: 'string' },
    datachannelId: { type: 'string' },
    values: { type: 'any' },
    updatedAt: { type: 'integer' },
    createdAt: { type: 'integer' },
    isActive: { type: 'boolean' },
  },
  required: [
    'deviceId',
    'deviceKey',
    'datachannelId',
    'values',
    'updatedAt',
    'createdAt',
    'isActive',
  ],
};