import {
  extname as extractExtname,
  dirname as extractDirname,
  basename as extractBasename,
  resolve as resolvePath,
} from "path";

import {
  default as fs,
} from "fs";

import {
  default as Rx,
  Observable,
} from "rx";

import {
  default as _,
} from "lodash";

import {
  default as nodeMkdirp,
} from "mkdirp";

import {
  default as webpack,
} from "webpack";

/**
 * @package
 */
export const mkdirp = Observable.fromNodeCallback(nodeMkdirp);

/**
 * @package
 */
export const writeFile = Observable.fromNodeCallback(fs.writeFile);

/**
 * @private
 */
export function replaceWithHtmlExt (filepath) {
  const dirpath = extractDirname(filepath);

  let basename = extractBasename(filepath);

  while (true) {
    const ext = extractExtname(basename);
    if (ext) {
      basename = extractBasename(basename, ext);
    } else {
      return resolvePath(dirpath, `${ basename }.html`);
    }
  }
}

/**
 * @package
 */
export function markupFileToWriteFileCreator (destDir) {
  return ({relativePath, markup}) => {
    const filepath = replaceWithHtmlExt(resolvePath(destDir, relativePath));

    return mkdirp(extractDirname(filepath))
      .selectMany(() => {
        return writeFile(filepath, markup);
      })
      .map(() => filepath);
    };
}

/**
 * @package
 */
export function entryListFileToEntry (entryListFile) {
  return Observable.from(entryListFile.entryList);
}

/**
 * @package
 */
export function webpackConfigArrayToIndexFilepathMap (webpackConfigArray) {
  return webpackConfigArray.reduce((acc, {webpackConfigFilepath}, index) => {
    return {
      ...acc,
      [index]: webpackConfigFilepath,
    };
  }, {});
}

/**
 * @package
 */
export function singleStatsArrayAndIndexFilepathMapCombiner (singleStatsArray, filepathByIndex) {
  return singleStatsArray
    .reduce((acc, singleStats, index) => {
      const filepath = filepathByIndex[index];

      return {
        ...acc,
        [filepath]: singleStats,
      };
    }, {});
}

/**
 * @package
 */
export function entryListFileAndFilepathWebpackStatsMapCombiner (entryListFile, webpackStatsByFilepath) {
  return {
    ...entryListFile,
    entryList: null,
    outputAssetListById: entryListFile.entryList.reduce((acc, {id, configFilepath, chunkName}) => {
      const webpackStats = webpackStatsByFilepath[configFilepath];
      const outputAssetList = [].concat(webpackStats.statsJson.assetsByChunkName[chunkName])
        .map(assetName => {
          return {
            rawAsset: webpackStats.stats.compilation.assets[assetName],
            publicFilepath: `${ webpackStats.statsJson.publicPath }${ assetName }`,
          };
        });
      return {
        ...acc,
        [id]: outputAssetList,
      };
    }, {}),
  };
}

import type { WebpackConfigWithFilepathType } from "../core/webpack";

/**
 * @package
 */
export function addDevServerToWebpackConfigCreator (devServerConfigFilepath: string) {
  if (!devServerConfigFilepath) {
    return _.identity;
  }

  return (webpackConfigWithFilepath: WebpackConfigWithFilepathType) => {
    const {webpackConfigFilepath, webpackConfig} = webpackConfigWithFilepath;

    if (webpackConfigFilepath !== devServerConfigFilepath) {
      return webpackConfigWithFilepath;
    }

    const {devServer} = webpackConfig;
    const inlineDevServerChunkList = [
      require.resolve("webpack-dev-server/client/") + `?http://${ devServer.host }:${ devServer.port }`,
      "webpack/hot/dev-server",
    ];

    return {
      ...webpackConfigWithFilepath,
      webpackConfig: {
        ...webpackConfig,
        reacthtmlpackDevServer: true,
        entry: _.mapValues(webpackConfig.entry, filepathList =>
          inlineDevServerChunkList.concat(filepathList)
        ),
        plugins: [
          ...webpackConfig.plugins,
          new webpack.HotModuleReplacementPlugin(),
        ],
      },
    };
  };
}
