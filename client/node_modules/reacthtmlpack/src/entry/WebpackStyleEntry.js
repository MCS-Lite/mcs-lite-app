import {
  default as React,
  Component,
  PropTypes,
} from "react";

import {
  default as invariant,
} from "fbjs/lib/invariant";

export default class WebpackStyleEntry extends Component {
  static propTypes = {
    chunkName: PropTypes.string.isRequired,
    chunkFilepath: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    configFilepath: PropTypes.string.isRequired,
    // Generated later.
    outputAssetList: PropTypes.arrayOf(PropTypes.shape({
      publicFilepath: PropTypes.string.isRequired,
    })),
  }

  render () {
    const {
      chunkName,
      chunkFilepath,
      configFilepath,
      outputAssetList,
      ...restProps,
    } = this.props;

    if (outputAssetList) {
      invariant(0 < outputAssetList.length, "[WebpackStyleEntry] outputAssetList is an empty array");

      const cssAssetList = outputAssetList
        .filter(({publicFilepath}) => {
          invariant("string" === typeof publicFilepath, "[WebpackStyleEntry] publicFilepath (%s) is not a string", publicFilepath);

          return /\.css$/.test(publicFilepath);
        });

      if (0 < cssAssetList.length) {
        const firstAsset = cssAssetList[0];
        return (
          <link {...restProps} rel="stylesheet" href={firstAsset.publicFilepath} />
        );
      }
    }
    return (
      <noscript />
    );
  }
}
