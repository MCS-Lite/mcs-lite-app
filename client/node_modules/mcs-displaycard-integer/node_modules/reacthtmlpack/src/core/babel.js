/* @flow */

import Rx, {
  Observable,
} from "rx";

import type { GlobFile } from "./globber";

// Note babel-core/index.js is NOT a ES6 module
const babel = require("babel-core");

export const transformFile = Observable.fromNodeCallback(babel.transformFile);

export type CodeFile = {filepath: string, relativePath: string, code: string};

export function addCodeToFile (file: GlobFile) : Observable<CodeFile> {
  return transformFile(file.filepath)
    .map(({code}) => ({
      ...file,
      code,
    }));
}
