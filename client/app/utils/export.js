export const prototypeJSON = (data) => {
  const JSONData = {};
  JSONData.prototype.prodName = data.prototypeName;
  JSONData.prototype.description = data.prototypeDescription;
  JSONData.prototype.version = data.version;
  JSONData.prototype.dataChannels = data.dataChannels;
}

// {
//   "prototype": {
//     "prodName": "React-Native Example",
//     "description": "",
//     "developmentNote": null,
//     "prodAppTypeId": 18,
//     "prodRlsStatusTypeId": 1,
//     "version": "0.0.1",
//     "displayConfigs": [
//       {
//         "format": {},
//         "displayType": 17,
//         "displayOrder": 1,
//         "streamTypeId": 5,
//         "dataChnIds": [
//           "message"
//         ],
//         "showHistory": false,
//         "configs": {}
//       },
//       {
//         "format": {},
//         "displayType": 1,
//         "displayOrder": 2,
//         "streamTypeId": 7,
//         "dataChnIds": [
//           "switch"
//         ],
//         "showHistory": false
//       }
//     ],
//     "saleReleaseDate": null,
//     "saleDiscontinuousDate": null,
//     "isLongConnectionNeeded": true,
//     "isSerialNeeded": false,
//     "isInterpreterCloudNeeded": false,
//     "status": true,
//     "prodImgURL": "",
//     "prodDesc": "",
//     "chipId": 4
//   },
//   "dataChannels": [
//     {
//       "dataChnId": "message",
//       "name": "message",
//       "description": "",
//       "channelType": {
//         "dataChnTypeId": 5,
//         "name": "String"
//       },
//       "streamId": 27843,
//       "format": {},
//       "isHidden": false,
//       "isControllable": true,
//       "unitType": {
//         "id": null,
//         "name": null
//       }
//     },
//     {
//       "dataChnId": "switch",
//       "name": "switch",
//       "description": "",
//       "channelType": {
//         "dataChnTypeId": 7,
//         "name": "Switch"
//       },
//       "streamId": 27844,
//       "format": {},
//       "isHidden": false,
//       "isControllable": true,
//       "unitType": {
//         "id": null,
//         "name": null
//       }
//     }
//   ],
//   "triggerActions": []
// }