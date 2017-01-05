import {
  default as React,
  Component,
  PropTypes,
} from "react";

import {
  default as ReactDOMServer,
} from "react-dom/server";

import {
  default as invariant,
} from "fbjs/lib/invariant";

import {
  evaluateAsES2015Module,
} from "../core/react";

export default class ReactRenderToStringEntry extends Component {
  static propTypes = {
    tagName: PropTypes.string.isRequired,
    chunkName: PropTypes.string.isRequired,
    chunkFilepath: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    configFilepath: PropTypes.string.isRequired,
    // Generated later.
    outputAssetList: PropTypes.arrayOf(PropTypes.shape({
      rawAsset: PropTypes.object.isRequired,
      publicFilepath: PropTypes.string.isRequired,
    })),
  }

  render () {
    const {
      tagName,
      chunkName,
      chunkFilepath,
      configFilepath,
      outputAssetList,
      ...restProps,
    } = this.props;

    if (outputAssetList) {
      invariant(0 < outputAssetList.length, "[ReactRenderToStringEntry] outputAssetList is an empty array");

      const jsAssetList = outputAssetList
        .filter(({publicFilepath}) => {
          invariant("string" === typeof publicFilepath, "[ReactRenderToStringEntry] publicFilepath (%s) is not a string", publicFilepath);

          return /\.js$/.test(publicFilepath);
        });
      invariant(0 < jsAssetList.length, "[ReactRenderToStringEntry] jsAssetList is an empty array. outputAssetList is [{rawAsset: %s, publicFilepath: %s}]", outputAssetList[0].rawAsset, outputAssetList[0].publicFilepath);

      const firstAsset = jsAssetList[0];
      invariant("object" === typeof firstAsset.rawAsset, "[ReactRenderToStringEntry] firstAsset.rawAsset (%s) is not an object", firstAsset.rawAsset);

      const ComponentModule = evaluateAsES2015Module(firstAsset.rawAsset.source());

      const markup = {
        __html: ReactDOMServer.renderToString(<ComponentModule.default />),
      };

      return React.createElement(tagName, {
        ...restProps,
        dangerouslySetInnerHTML: markup,
      });
    } else {
      return (
        <noscript />
      );
    }
  }
}
