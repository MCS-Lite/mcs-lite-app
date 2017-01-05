import {
  resolve as resolvePath,
} from "path";

import {
  default as Rx,
  Observable,
} from "rx";

import {
  default as _,
} from "lodash";

import {
  createGlobResult,
  globResultToFile,
  addCodeToFile,
  addElementToFile,
  addEntryListToFile,
  groupedEntryListToWebpackConfig,
  webpackConfigReducer,
  webpackConfigArrayInspector,
  webpackConfigArrayToWebpackCompiler,
  webpackMultiCompilerToMultiStats,
  webpackMultiStatsToWebpackSingleStatsArray,
  withOutputAssetsFileToMarkupFile,
  // Watch
  webpackCompilerRunWithWatchToSingleStatsWithIndex,
  // DevServer
  webpackMultiCompilerRunWithDevServerToSingleStatsArray,
} from "./core/index";

import {
  mkdirp,
  writeFile,
  markupFileToWriteFileCreator,
  entryListFileToEntry,
  webpackConfigArrayToIndexFilepathMap,
  singleStatsArrayAndIndexFilepathMapCombiner,
  entryListFileAndFilepathWebpackStatsMapCombiner,
  // DevServer
  addDevServerToWebpackConfigCreator,
} from "./util/index";

/**
 * @private
 */
export function createEntryListFile (srcPatternList) {
  return Observable.from(srcPatternList)
    .selectMany(createGlobResult)
    .selectMany(globResultToFile)
    .selectMany(addCodeToFile)
    .map(addElementToFile)
    .map(addEntryListToFile)
}

/**
 * @private
 */
export function createWebpackConfigArray (entryListFile, devServerConfigFilepath) {
  return entryListFile
    .selectMany(entryListFileToEntry)
    .groupBy(entry => entry.configFilepath)
    .selectMany(groupedEntryListToWebpackConfig)
    .map(addDevServerToWebpackConfigCreator(devServerConfigFilepath))
    .reduce(webpackConfigReducer, [])
    // Un-comment to demonstrate hot v.s. cold Observable
    // .tap(::console.log)
}

/**
 * @private
 */
export function createWebpackConfigFilepathByIndex (webpackConfigArray) {
  return webpackConfigArray
    .map(webpackConfigArrayToIndexFilepathMap);
}

/**
 * @public
 */
export function buildToDir (destDir, srcPatternList) {

  const sharedReplayEntryListFileStream = createEntryListFile(srcPatternList)
    .shareReplay()

  const publishedWebpackConfigArrayStream = createWebpackConfigArray(sharedReplayEntryListFileStream)
    .publish()

  const webpackConfigFilepathByIndexStream = createWebpackConfigFilepathByIndex(publishedWebpackConfigArrayStream);

  const writeToFileResultStream = publishedWebpackConfigArrayStream
    .map(webpackConfigArray => webpackConfigArray.map(({webpackConfig}) => webpackConfig))
    .tap(webpackConfigArrayInspector)
    .map(webpackConfigArrayToWebpackCompiler)
    .selectMany(webpackMultiCompilerToMultiStats)
    .map(webpackMultiStatsToWebpackSingleStatsArray)
    .withLatestFrom(
      webpackConfigFilepathByIndexStream,
      singleStatsArrayAndIndexFilepathMapCombiner
    )
    .selectMany(w =>
      sharedReplayEntryListFileStream.map(e =>
        entryListFileAndFilepathWebpackStatsMapCombiner(e, w)
      )
    )
    .map(withOutputAssetsFileToMarkupFile)
    .selectMany(markupFileToWriteFileCreator(destDir));

  writeToFileResultStream.subscribe(
    it => console.log(`Next: ${ it }`),
    error => {throw error},
    () => console.log(`Done!`)
  );

  publishedWebpackConfigArrayStream.connect();
}

/**
 * @public
 */
export function watchAndBuildToDir (destDir, srcPatternList) {

  const sharedReplayEntryListFileStream = createEntryListFile(srcPatternList)
    .shareReplay()

  const publishedWebpackConfigArrayStream = createWebpackConfigArray(sharedReplayEntryListFileStream)
    .publish()

  const webpackConfigFilepathByIndexStream = createWebpackConfigFilepathByIndex(publishedWebpackConfigArrayStream);

  const writeToFileResultStream = publishedWebpackConfigArrayStream
    .map(webpackConfigArray => webpackConfigArray.map(({webpackConfig}) => webpackConfig))
    .tap(webpackConfigArrayInspector)
    .selectMany(function webpackConfigArrayRunWithWatchToSingleStatsArray (webpackConfigArray) {
      // Why selectMany? Because watch could be repeative.
      // Instead of wrapping one value, now a series of values are emitted.
      return Observable.from(webpackConfigArray)
        .map(webpackConfigArrayToWebpackCompiler)
        .selectMany(webpackCompilerRunWithWatchToSingleStatsWithIndex)
        .scan((acc, it) => {
          acc = [...acc];
          const {index, ...rest} = it;

          acc[index] = rest;

          return acc;
        }, new Array(webpackConfigArray.length))
        .takeWhile(webpackSingleStatsArray => webpackSingleStatsArray.every(_.identity));
    })
    .withLatestFrom(
      webpackConfigFilepathByIndexStream,
      singleStatsArrayAndIndexFilepathMapCombiner
    )
    .selectMany(w =>
      sharedReplayEntryListFileStream.map(e =>
        entryListFileAndFilepathWebpackStatsMapCombiner(e, w)
      )
    )
    .map(withOutputAssetsFileToMarkupFile)
    .selectMany(markupFileToWriteFileCreator(destDir));

  writeToFileResultStream.subscribe(
    it => console.log(`Next: ${ it }`),
    error => {throw error},
    () => console.log(`Done!`)
  );

  publishedWebpackConfigArrayStream.connect();
}

/**
 * @public
 */
export function devServer (relativeDevServerConfigFilepath, destDir, srcPatternList) {

  const devServerConfigFilepath = resolvePath(process.cwd(), relativeDevServerConfigFilepath);

  const sharedReplayEntryListFileStream = createEntryListFile(srcPatternList)
    .shareReplay()

  const publishedWebpackConfigArrayStream = createWebpackConfigArray(sharedReplayEntryListFileStream, devServerConfigFilepath)
    .publish()

  const webpackConfigFilepathByIndexStream = createWebpackConfigFilepathByIndex(publishedWebpackConfigArrayStream);

  const writeToFileResultStream = publishedWebpackConfigArrayStream
    .map(webpackConfigArray => webpackConfigArray.map(({webpackConfig}) => webpackConfig))
    .tap(webpackConfigArrayInspector)
    .map(webpackConfigArrayToWebpackCompiler)
    // Why selectMany? Because devServer just like watch could be repeative.
    // Instead of wrapping one value, now a series of values are emitted.
    .selectMany(webpackMultiCompilerRunWithDevServerToSingleStatsArray)
    .withLatestFrom(
      webpackConfigFilepathByIndexStream,
      singleStatsArrayAndIndexFilepathMapCombiner
    )
    .selectMany(w =>
      sharedReplayEntryListFileStream.map(e =>
        entryListFileAndFilepathWebpackStatsMapCombiner(e, w)
      )
    )
    .map(withOutputAssetsFileToMarkupFile)
    .selectMany(markupFileToWriteFileCreator(destDir));

  writeToFileResultStream.subscribe(
    it => console.log(`Next: ${ it }`),
    error => {throw error},
    () => console.log(`Done!`)
  );

  publishedWebpackConfigArrayStream.connect();
}
