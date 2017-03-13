import React, { Component } from 'react';
import R from 'ramda';
import { pure, compose } from 'recompose';
import { Button } from 'mcs-lite-ui';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';
import defaultImage from './defaultImage.png';

import styles from './styles.css';

//  W : H = 1.873469 : 1
const cropImage = (file, image, outH) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const sourceX = Math.max((image.width - (1.873469 * image.height)) / 2, 0);
  const sourceY = Math.max((image.height - (image.width / 1.873469)) / 2, 0);
  canvas.width = 1.873469 * outH;
  canvas.height = outH;
  context.drawImage(
    image, sourceX, sourceY, 2 * outH, outH,
    0, 0, 2 * outH, outH,
  );

  const dataUrl = canvas.toDataURL(file.type, 0.5);
  const byteString = atob(dataUrl.split(',')[1]);

  const imageArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) {
    imageArray[i] = byteString.charCodeAt(i);
  }

  return new File([imageArray], file.name, { type: file.type, lastModified: Date.now() });
};

class ImageUploader extends Component {
  onUploadClick = () => this.inputFile.click();

  handleUpload = (uploadingFile) => {
    if (uploadingFile.size > 2048 * 1024) {
      this.props.pushToast({ kind: 'error', message: this.props.getMessages('fileSizeExceeds') });
    } else {
      const data = new FormData();
      data.append('file', uploadingFile);
      this.props.uploadImage(data)
        .then(({ data: imagePath }) => {
          this.props.pushToast({ kind: 'success', message: this.props.getMessages('imageUploadSuccess') });
          // this.props.setPreviewUrl(window.apiUrl.replace('api', 'images/') + imagePath);
          this.props.onChange(imagePath);
        })
        .catch(() => this.props.pushToast({ kind: 'error', message: this.props.getMessages('errorWhenUploadImage') }));
    }
  }

  inputFileOnChange = (e) => {
    const fr = new FileReader();
    const img = new Image();
    const file = e.target.files[0];

    const imageOnload = () => {
      let outH;
      const sourceH = img.height;
      const sourceW = img.width;
      if ((sourceW / sourceH) >= 1.873469) {
        outH = sourceH;
      } else {
        outH = sourceW / 1.873469;
      }

      const cropedFile = cropImage(file, img, outH);
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
    const { imageUrl } = this.props;

    return (
      <div className={styles.base}>
        <img
          src={
            (R.isEmpty(imageUrl) || R.isNil(imageUrl))
            ? defaultImage
            : window.apiUrl.replace('api', 'images/') + this.props.imageUrl
          }
          alt="preview"
          className={styles.img}
        />
        <Button
          kind="primary"
          className={styles.upload}
          onClick={this.onUploadClick}
        >
          上傳
        </Button>
        <input
          type="file"
          accept=".png,.jpg"
          ref={(c) => { this.inputFile = c; }}
          onChange={this.inputFileOnChange}
          className={styles.inputFile}
        />
      </div>
    );
  }
}

export default compose(
  pure,
  withGetMessages(messages, 'ImageUploader'),
)(ImageUploader);
