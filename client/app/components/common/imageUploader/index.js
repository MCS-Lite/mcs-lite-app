import React, { Component } from 'react';
import c from 'classnames';
import R from 'ramda';
import { pure, compose, withState } from 'recompose';
import { Button } from 'mcs-lite-ui';
import { withGetMessages } from 'react-intl-inject-hoc';
import imageUploadImage from 'images/img_upload_img.svg';
import messages from './messages';

import styles from './styles.css';

//  W : H = 1.875 : 1
const cropImage = (file, image, outH) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const sourceX = Math.max((image.width - (1.875 * image.height)) / 2, 0);
  const sourceY = Math.max((image.height - (image.width / 1.875)) / 2, 0);
  canvas.width = 1.875 * outH;
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

  onDragOver = e => e.preventDefault();
  onDragEnter = (e) => {
    e.preventDefault();
    this.props.setIsDragEnter(true);
  }
  onDragLeave = (e) => {
    e.preventDefault();
    this.props.setIsDragEnter(false);
  }

  onDrop = (e) => {
    e.preventDefault();
    this.props.setIsDragEnter(false);
    const file = R.pathOr(null, ['dataTransfer', 'files', 0], e);
    if (file) {
      this.processFile(file);
    }
  }

  processFile = (file) => {
    const fr = new FileReader();
    const img = new Image();

    const imageOnload = () => {
      let outH;
      const sourceH = img.height;
      const sourceW = img.width;
      if ((sourceW / sourceH) >= 1.875) {
        outH = sourceH;
      } else {
        outH = sourceW / 1.875;
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

  inputFileOnChange = (e) => {
    const file = e.target.files[0];
    this.processFile(file);
  }

  handleUpload = (uploadingFile) => {
    if (uploadingFile.size > 2048 * 1024) {
      this.props.pushToast({ kind: 'error', message: this.props.getMessages('fileSizeExceeds') });
    } else {
      const data = new FormData();
      data.append('file', uploadingFile);
      this.props.uploadImage(data)
        .then(({ data: imagePath }) => {
          this.props.pushToast({ kind: 'success', message: this.props.getMessages('imageUploadSuccess') });
          this.props.onChange(imagePath);
        })
        .catch(() => this.props.pushToast({ kind: 'error', message: this.props.getMessages('errorWhenUploadImage') }));
    }
  }

  render() {
    const { imageUrl, getMessages: t } = this.props;

    return (
      <div className={styles.base}>
        {
          (R.isEmpty(imageUrl) || R.isNil(imageUrl))
          ?
            <div
              className={c(
                styles.imageUploadDescription,
                this.props.isDragEnter && styles.dragEnter,
              )}
              onDragOver={this.onDragOver}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onDrop={this.onDrop}
            >
              <img src={imageUploadImage} alt="upload" />
              <div>
                <div>{t('descriptionL1')}</div>
                <div>{t('descriptionL2')}</div>
              </div>
            </div>
          : <img
            src={window.apiUrl.replace('api', 'images/') + this.props.imageUrl}
            alt="preview"
            className={c(
              styles.img,
              this.props.isDragEnter && styles.dragEnter,
            )}
            onDragOver={this.onDragOver}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            onDrop={this.onDrop}
          />
        }
        <Button
          kind="primary"
          className={styles.upload}
          onClick={this.onUploadClick}
        >
          {t('upload')}
        </Button>
        <input
          type="file"
          accept=".png,.jpg"
          ref={(component) => { this.inputFile = component; }}
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
  withState('isDragEnter', 'setIsDragEnter', false),
)(ImageUploader);
