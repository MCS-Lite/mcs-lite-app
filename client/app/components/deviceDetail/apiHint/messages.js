import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'ApiHint.helpful': {
    id: 'ApiHint.helpful',
    description: 'Title 1',
    defaultMessage: '這裡是可能有幫助的 API 提示',
  },
  'ApiHint.example': {
    id: 'ApiHint.example',
    description: 'description',
    defaultMessage: '您可以使用這邊提供的 API 來設定你所需要的動作。例如上傳和讀取資料點。',
  },
  'ApiHint.datachannelName': {
    id: 'ApiHint.datachannelName',
    defaultMessage: '資料通道名稱：',
  },
  'ApiHint.datachannelId': {
    id: 'ApiHint.datachannelId',
    defaultMessage: '資料通道 Id：',
  },
  'ApiHint.apiType': {
    id: 'ApiHint.apiType',
    defaultMessage: 'API 類型：',
  },
  'ApiHint.upload': {
    id: 'ApiHint.upload',
    defaultMessage: '上傳資料點',
  },
  'ApiHint.retrieve': {
    id: 'ApiHint.retrieve',
    defaultMessage: '取得資料點',
  },
  'ApiHint.copy': {
    id: 'ApiHint.copy',
    defaultMessage: '複製',
  },
});

export default messages;
