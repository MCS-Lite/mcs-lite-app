module.exports = [
  { path: '/admin', handler: 'adminHandler' },
  { path: '/prototypes', handler: 'prototypeHandler' },
  { path: '/prototypes/:prototypeId', handler: 'prototypeDetailHandler' },
  { path: '/devices', handler: 'deviceHandler' },
  { path: '/devices/:deviceId', handler: 'deviceDetailHandler' },
];
