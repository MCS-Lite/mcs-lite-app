export const data = [{
  dataChannelTypeId: 7,
  dataChannelTypeName: "ON / OFF",
  type: 1,
  configs: {},
  configSchema: {},
},{
  dataChannelTypeId: 10,
  dataChannelTypeName: "Category",
  type: 1,
  configs: {
    format: {
      'key1 name': {
        displayName: 'Key1 name',
        type: 'string',
        required: true,
        limit: 5,
      },
      'key1 value': {
        displayName: 'Key1 value',
        type: 'string',
        required: true,
      },
      'key2 name': {
        displayName: 'Key2 name',
        type: 'string',
        required: true,
        limit: 5,
      },
      'key2 value': {
        displayName: 'Key2 value',
        type: 'string',
        required: true,
      },
    },
  },
  configSchema: {},
},{
  dataChannelTypeId: 1,
  dataChannelTypeName: 'Integer',
  type: 1,
  configs: {
    format: {
      lowerbound: {
        displayName: 'Lowerbound',
        type: 'number',
        required: true,
      },
      upperbound: {
        displayName: 'Upperbound',
        type: 'number',
        required: true,
      },
      unitTypes: {
        displayName: 'UnitTypes',
        type: 'unit',
        required: true,
      },
    },
  },
  configSchema: {},
},{
  dataChannelTypeId: 2,
  dataChannelTypeName: "Float",
  type: 1,
  configs: {
    format: {
      lowerbound: {
        displayName: 'Lowerbound',
        type: 'number',
        required: true,
      },
      upperbound: {
        displayName: 'Upperbound',
        type: 'number',
        required: true,
      },
      unitTypes: {
        displayName: 'UnitTypes',
        type: 'unit',
        required: true,
      }
    },
  },
  configSchema: {},
},{
  dataChannelTypeId: 4,
  dataChannelTypeName: "Hex",
  type: 1,
  configs: {},
  configSchema: {},
},{
  dataChannelTypeId: 5,
  dataChannelTypeName: "String",
  type: 1,
  configs: {},
  configSchema: {},
},
// {
//   dataChannelTypeId: 6,
//   dataChannelTypeName: "GPS",
//   type: 1,
//   configs: {},
//   configSchema: {},
// }
,{
  dataChannelTypeId: 11,
  dataChannelTypeName: "GPIO",
  type: 1,
  configs: {
    graph: 'gpio',
    isHaveHistory: true,
  },
  configSchema: {},
},{
  dataChannelTypeId: 12,
  dataChannelTypeName: "PWM",
  type: 1,
  configs: {
    graph: 'pwm',
    isHaveHistory: true,
  },
  configSchema: {},
},{
  dataChannelTypeId: 3,
  dataChannelTypeName: "ON / OFF",
  type: 2,
  configs: {},
  configSchema: {},
},{
  dataChannelTypeId: 10,
  dataChannelTypeName: "Category",
  type: 2,
  configs: {
    format: {
      'key1 name': {
        displayName: 'Key1 name',
        type: 'string',
        required: true,
        limit: 5,
      },
      'key1 value': {
        displayName: 'Key1 value',
        type: 'string',
        required: true,
      },
      'key2 name': {
        displayName: 'Key2 name',
        type: 'string',
        required: true,
        limit: 5,
      },
      'key2 value': {
        displayName: 'Key2 value',
        type: 'string',
        required: true,
      },
    },
  },
  configSchema: {},
},{
  dataChannelTypeId: 1,
  dataChannelTypeName: "Integer",
  type: 2,
  configs: {
    format: {
      unitTypes: {
        displayName: 'UnitTypes',
        type: 'unit',
        required: true,
      },
    },
  },
  configSchema: {},
},{
  dataChannelTypeId: 2,
  dataChannelTypeName: "Float",
  type: 2,
  configs: {
    unitTypes: {
      displayName: 'UnitTypes',
      type: 'unit',
      required: true,
    },
  },
  configSchema: {},
},{
  dataChannelTypeId: 4,
  dataChannelTypeName: "Hex",
  type: 2,
  configs: {},
  configSchema: {},
},{
  dataChannelTypeId: 5,
  dataChannelTypeName: "String",
  type: 2,
  configs: {},
  configSchema: {},
},
// {
//   dataChannelTypeId: 6,
//   dataChannelTypeName: "GPS",
//   type: 2,
//   configs: {},
//   configSchema: {},
// }
,{
  dataChannelTypeId: 11,
  dataChannelTypeName: "GPIO",
  type: 2,
  configs: {
    graph: 'gpio',
    isHaveHistory: true,
  },
  configSchema: {},
},{
  dataChannelTypeId: 12,
  dataChannelTypeName: "PWM",
  type: 2,
  configs: {
    graph: 'pwm',
    isHaveHistory: true,
  },
  configSchema: {},
},{
  dataChannelTypeId: 13,
  dataChannelTypeName: "Analog",
  type: 1,
  configs: {
    format: {
      lowerbound: {
        displayName: 'Lowerbound',
        type: 'number',
        required: true,
      },
      upperbound: {
        displayName: 'Upperbound',
        type: 'number',
        required: true,
      },
      unitTypes: {
        displayName: 'UnitTypes',
        type: 'unit',
        required: true,
      }
    },
  },
  configSchema: {},
},
// {
//   dataChannelTypeId: 14,
//   dataChannelTypeName: "GamePad",
//   type: 1,
//   configs: {},
//   configSchema: {},
// }
// ,{
//   dataChannelTypeId: 15,
//   dataChannelTypeName: "Image",
//   type: 2,
//   configs: {},
//   configSchema: {},
// }
// ,{
//   dataChannelTypeId: 16,
//   dataChannelTypeName: "Video Stream",
//   type: 2,
//   configs: {},
//   configSchema: {},
// }
];