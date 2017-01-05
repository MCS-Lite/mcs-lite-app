/* @flow */
import {
  dirname as toDirname,
  resolve as resolvePath,
} from "path";

import React, {
  Children,
} from "react";

import ReactDOM from "react-dom/server";

import Rx, {
  Observable,
} from "rx";

import {
  default as webpack,
} from "webpack";

import {
  default as WebpackDevServer,
} from "webpack-dev-server";

import entryPropTypeKeyList from "../entry/entryPropTypeKeyList";

import { transformFile } from "./babel";
import { evaluateAsES2015Module } from "./react";

import type { ElementFile } from "./react";

/**
 * @private
 */
export function isEntryType (type: any) : bool {
  return entryPropTypeKeyList.every(key => {
    return type.propTypes && type.propTypes[key];
  });
}

export type EntryType = {id: string, chunkName: string, chunkFilepath: string, configFilepath: string};
export type EntryListType = Array<EntryType>;

/**
 * @private
 */
export function entryWithConfigReducer (children: any, resolvePathByFile: (filepath: string) => string) : EntryListType {
  const acc = [];

  Children.forEach(children, child => {
    if (!React.isValidElement(child)) {
      return;
    }
    if (isEntryType(child.type)) {
      acc.push({
        id: `${ child.props.configFilepath }__${ child.props.chunkName }`,
        chunkName: child.props.chunkName,
        chunkFilepath: [].concat(child.props.chunkFilepath).map(resolvePathByFile),
        configFilepath: resolvePathByFile(child.props.configFilepath),
      });
    }
    acc.push(...entryWithConfigReducer(child.props.children, resolvePathByFile));
  });

  return acc;
}

export type EntryListFile = {filepath: string, relativePath: string, code: string, element: any, doctypeHTML: string, entryList: EntryListType};

export function addEntryListToFile (file: ElementFile) : EntryListFile {
  const resolvePathByFile = it => resolvePath(toDirname(file.filepath), it);

  const entryList = entryWithConfigReducer(file.element.props.children, resolvePathByFile);

  return {
    ...file,
    entryList,
  };
}

export function webpackConfigEntryReducer (acc: object, entry: EntryType): object {
  const {chunkName, chunkFilepath} = entry;
  if (!acc.entry.hasOwnProperty(chunkName)) {
    acc.entry[chunkName] = chunkFilepath;
  }
  return acc;
}

export type WebpackConfigWithFilepathType = {webpackConfigFilepath: string, webpackConfig: object};

export function entryObjectToWebpackConfig (acc: object): Observable<WebpackConfigWithFilepathType> {
  const webpackConfigFilepath = acc.webpackConfigFilepath;
  const entry = acc.entry;

  return transformFile(webpackConfigFilepath)
    .map(({code}) => {
      const WebpackConfigModule = evaluateAsES2015Module(code, webpackConfigFilepath);
      const webpackConfig = WebpackConfigModule.default;

      return {
        webpackConfigFilepath,
        webpackConfig: {
          ...webpackConfig,
          entry: {
            ...webpackConfig.reacthtmlpackExtraEntry,
            ...entry,
          },
        },
      };
    });
}

export function groupedEntryListToWebpackConfig (groupedEntryList: Observable<EntryType>): Observable<WebpackConfigWithFilepathType> {
  // http://requirebin.com/?gist=fe2c7d8fe7083d8bcd2d
  const {key: webpackConfigFilepath} = groupedEntryList;

  return groupedEntryList.reduce(webpackConfigEntryReducer, {
      webpackConfigFilepath,
      entry: {},
    })
    .selectMany(entryObjectToWebpackConfig);
}

export function webpackConfigReducer (webpackConfigArray: array<object>, webpackConfig): array<object> {
  // Your Client config should always be first
  if (webpackConfig.reacthtmlpackDevServer) {
    return [webpackConfig].concat(webpackConfigArray);
  } else {
    return webpackConfigArray.concat(webpackConfig);
  }
}

export function webpackConfigArrayInspector (webpackConfigArray: array<object>): void {
  const notMultipleConfig = 2 > webpackConfigArray.length;
  if (notMultipleConfig) {
    return;
  }
  const [{reacthtmlpackDevServer, output: {path: outputPath}}] = webpackConfigArray;
  const notInDevServerMode = !reacthtmlpackDevServer;
  if (notInDevServerMode) {
    return;
  }
  // In devServer command, you have to keep all output.path the same.
  const theyDontHaveTheSameOutputPath = webpackConfigArray.some(it => it.output.path !== outputPath);
  if (theyDontHaveTheSameOutputPath) {
    const message = `Some of your output.path is different than others in 
all of your webpack config files. This may cause unexpected behaviour when 
using them with webpack-dev-server. The base path serving your assets may 
change according to these commits:
0. https://github.com/webpack/webpack-dev-server/blob/f6b3bcb4a349540176bacc86df0df8e4109d0e3f/lib/Server.js#L53
1. https://github.com/webpack/webpack-dev-middleware/blob/42e5778f44939cd45fedd36d7b201b3eeb357630/middleware.js#L140
2. https://github.com/webpack/webpack/blob/8ff6cb5fedfc487665bb5dd8ecedf5d4ea306b51/lib/MultiCompiler.js#L51-L63
request goes from webpack-dev-server (0.) > webpack-dev-middleware (1.) > webpack/MultiCompiler (2.)`

    console.warn(message);
  }
}

export function webpackConfigArrayToWebpackCompiler (webpackConfigArray: array<object>): object {
  return webpack(webpackConfigArray);
}

export function webpackMultiCompilerToMultiStats (webpackMultiCompiler: object): Observable<object> {
  return Observable.fromNodeCallback(::webpackMultiCompiler.run)();
}

export type WebpackSingleStats = {stats: object, statsJson: object};

export function webpackMultiStatsToWebpackSingleStatsArray (webpackMultiStats: object): Observable<array<WebpackSingleStats>> {
  // See MultiCompiler - MultiStats
  return webpackMultiStats.stats
    .map(stats => ({stats, statsJson: stats.toJson()}));
}

export type WithOutputAssetsFile = {filepath: string, relativePath: string, code: string, element: any, doctypeHTML: string, outputAssetListById: object};

export type MarkupFile = {relativePath: string, markup: string};

export function entryWithOutputMapper (children, outputAssetListById) {
  return Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }
    const extraProps = {
      children: entryWithOutputMapper(child.props.children, outputAssetListById),
    };

    if (isEntryType(child.type)) {
      const id = `${ child.props.configFilepath }__${ child.props.chunkName }`;
      extraProps.outputAssetList = outputAssetListById[id];
    }

    return React.cloneElement(child, extraProps);
  });
}

export function withOutputAssetsFileToMarkupFile (withOutputAssetsFile: WithOutputAssetsFile): MarkupFile {
  const clonedElement = React.cloneElement(withOutputAssetsFile.element, {
    children: entryWithOutputMapper(withOutputAssetsFile.element.props.children, withOutputAssetsFile.outputAssetListById),
  });

  const reactHtmlMarkup = ReactDOM.renderToStaticMarkup(clonedElement);
  const markup = `${ withOutputAssetsFile.doctypeHTML }${ reactHtmlMarkup }`;

  return {
    relativePath: withOutputAssetsFile.relativePath,
    markup,
  };
}

export type WebpackSingleStatsWithIndex = {index: number, stats: object, statsJson: object};

export function webpackCompilerRunWithWatchToSingleStatsWithIndex (webpackCompiler: object, index: number): Observable<WebpackSingleStatsWithIndex> {
  return Observable.create(observer => {
    function callback (err, stats) {
      if (err) {
        observer.onError(err);
      } else {
        observer.onNext({
          index,
          stats,
          statsJson: stats.toJson(),
        });
      }
    }

    const watcher = webpackCompiler.watch({}, callback);
    return () => {
      watcher.close();
    };
  });
}

export function webpackMultiCompilerRunWithDevServerToSingleStatsArray (webpackMultiCompiler: object): Observable<array<WebpackSingleStats>> {

  const [devServer] = webpackMultiCompiler
    .compilers
    .filter(compiler => compiler.options.reacthtmlpackDevServer)
    .map(compiler => compiler.options.devServer);
  const wDS = new WebpackDevServer(webpackMultiCompiler, devServer);

  return Observable.create(observer => {
    wDS.listen(devServer.port, devServer.host, (err) => {
      if (err) {
        observer.onError(err);
      }
    });

    webpackMultiCompiler.plugin("done", webpackMultiStats => {
      observer.onNext(
        webpackMultiStats.stats
          .map(stats => ({stats, statsJson: stats.toJson()}))
      );
    });
  });
}
