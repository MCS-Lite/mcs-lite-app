import React from 'react';
import { compose, pure } from 'recompose';
import Avatar from 'mtk-ui/lib/Avatar';
import { MiCamera } from 'mtk-icon';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

import styles from './styles.css';

const cropImage = (file, image, maxImageSize) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const sourceX = Math.max((image.width - image.height) / 2, 0);
  const sourceY = Math.max((image.height - image.width) / 2, 0);
  const sourceEdgeLength = Math.min(image.height, image.width);
  const destEdgeLength = Math.min(sourceEdgeLength, maxImageSize);

  canvas.width = destEdgeLength;
  canvas.height = destEdgeLength;
  context.drawImage(
    image, sourceX, sourceY, sourceEdgeLength, sourceEdgeLength,
    0, 0, destEdgeLength, destEdgeLength,
  );

  const dataUrl = canvas.toDataURL(file.type, 0.5);
  const byteString = atob(dataUrl.split(',')[1]);

  const imageArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) {
    imageArray[i] = byteString.charCodeAt(i);
  }

  return new File([imageArray], file.name, { type: file.type, lastModified: Date.now() });
};

class ProfilePhoto extends React.Component {

  onClick = () => this.inputFile.click()
  bindInputFile = (ref) => { this.inputFile = ref; }

  handleUpload = (uploadingFile) => {
    if (uploadingFile.size > 2048 * 1024) {
      this.props.pushToast({ kind: 'error', message: this.props.getMessages('fileSizeExceeds') });
    } else {
      const data = new FormData();
      data.append('file', uploadingFile);
      this.props.uploadProfileImage(data)
        .then(() => this.props.pushToast({ kind: 'success', message: this.props.getMessages('imageUploadSuccess') }))
        .catch(() => this.props.pushToast({ kind: 'error', message: this.props.getMessages('errorWhenUploadImage') }));
    }
  }

  inputFileOnChange = (e) => {
    const fr = new FileReader();
    const img = new Image();
    const file = e.target.files[0];

    const imageOnload = () => {
      const edgeLength = Math.min(img.height, img.width);
      const cropedFile = cropImage(file, img, edgeLength);
      this.handleUpload(cropedFile);
    };
    fr.onload = () => {
      img.onload = imageOnload;
      img.src = fr.result;
    };
    if (file) {
      fr.readAsDataURL(file);
    } else {
      this.props.pushToast({ kind: 'error', message: this.props.getMessages('errorWhenUploadImage') });
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <Avatar
          src={this.props.userImage}
          size={150}
          className={styles.avatar}
          onClick={this.onClick}
        />
        <div className={styles.hoverMask}>
          <MiCamera size={48} />
          <span>{this.props.getMessages('uploadImage')}</span>
        </div>
        <input
          type="file"
          accept=".png,.jpg"
          ref={this.bindInputFile}
          onChange={this.inputFileOnChange}
          className={styles.inputFile}
        />
      </div>
    );
  }
}

export default compose(
  pure,
  withGetMessages(messages, 'Profile'),
)(ProfilePhoto);
