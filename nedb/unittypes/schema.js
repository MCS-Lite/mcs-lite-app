module.exports = {
  type: 'object',
  properties: {
    createUserId: { type: 'string' },
    name: { type: 'string' },
    symbol: { type: 'string' },
    isActive: { type: 'boolean' },
    isTemplate: { type: 'boolean' },
    updatedAt: { type: 'integer' },
    createdAt: { type: 'integer' },
  },
  required: [
    'createUserId',
    'name',
    'symbol',
    'isTemplate',
    'isActive',
    'updatedAt',
    'createdAt',
  ],
};