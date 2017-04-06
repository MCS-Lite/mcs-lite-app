import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'ImageUploader.fileSizeExceeds': {
    id: 'ImageUploader.fileSizeExceeds',
    defaultMessage: '錯誤！圖片檔案過大。',
  },
  'ImageUploader.imageUploadSuccess': {
    id: 'ImageUploader.imageUploadSuccess',
    defaultMessage: '成功！你已經成功上傳圖片。',
  },
  'ImageUploader.errorWhenUploadImage': {
    id: 'ImageUploader.errorWhenUploadImage',
    defaultMessage: '錯誤！上傳圖片時發生錯誤。',
  },
  'ImageUploader.descriptionL1': {
    id: 'ImageUploader.descriptionL1',
    defaultMessage: '將您想上傳的圖片拖拉於此',
  },
  'ImageUploader.descriptionL2': {
    id: 'ImageUploader.descriptionL2',
    defaultMessage: '推薦大小為 1600 x 854 pixels',
  },
  'ImageUploader.upload': {
    id: 'ImageUploader.upload',
    defaultMessage: '上傳',
  },
});

export default messages;
