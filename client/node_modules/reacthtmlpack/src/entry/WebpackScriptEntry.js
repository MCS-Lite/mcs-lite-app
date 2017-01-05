import {
  default as React,
  Component,
  PropTypes,
} from "react";

import {
  default as invariant,
} from "fbjs/lib/invariant";

export default class WebpackScriptEntry extends Component {
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
      invariant(0 < outputAssetList.length, "[WebpackScriptEntry] outputAssetList is an empty array");

      const jsAssetList = outputAssetList
        .filter(({publicFilepath}) => {
          invariant("string" === typeof publicFilepath, "[WebpackScriptEntry] publicFilepath (%s) is not a string", publicFilepath);

          return /\.js$/.test(publicFilepath);
        });
      invariant(0 < jsAssetList.length, "[WebpackScriptEntry] jsAssetList is an empty array. outputAssetList is [{publicFilepath: %s}]", outputAssetList[0].publicFilepath);

      const firstAsset = jsAssetList[0];

      return (
        <script {...restProps} src={firstAsset.publicFilepath} />
      );
    } else {
      return (
        <noscript />
      );
    }
  }
}
