/* @flow */

import {
  relative as relativePathOf,
} from "path";

import {
  Glob,
} from "glob";

import glob2base from "glob2base";

import Rx, {
  Observable,
} from "rx";

export type GlobResult = {base: string, matches: Array<string>};

export function createGlobResult (pattern: string): Observable<GlobResult> {
  const globber = new Glob(pattern);
  const base = glob2base(globber);

  return Rx.Observable.create(function (observer) {
    function callback (matches) {
      observer.onNext({
        base,
        matches,
      });
      observer.onCompleted();
    };

    globber.once("end", callback);
    globber.on("error", observer.onError);

    return () => {
      globber.removeListener("end", callback);
      globber.removeListener("error", observer.onError);
    };
  });
}

export type GlobFile = {filepath: string, relativePath: string};

export function globResultToFile (globResult: GlobResult) : Observable<GlobFile> {
  return Observable.fromArray(globResult.matches)
    .map(filepath => ({
      filepath,
      relativePath: relativePathOf(globResult.base, filepath),
    }));
}

