/* @flow */

import evaluateAsModule from "eval-as-module";

import type { CodeFile } from "./babel";

export function evaluateAsES2015Module (code: string, filepath: string) : any {
  const cjsModule = evaluateAsModule(code, filepath);
  if (cjsModule.exports && cjsModule.__esModule) {
    return cjsModule.exports;
  } else {
    return {
      "default": cjsModule.exports,
    };
  };
}

export type ElementFile = {filepath: string, relativePath: string, code: string, element: any, doctypeHTML: string};

export function addElementToFile (file: CodeFile) : ElementFile {
  const module = evaluateAsES2015Module(file.code, file.filepath);
  const element = module.default;
  const doctypeHTML = "undefined" !== typeof module.doctypeHTML ? module.doctypeHTML : "<!DOCTYPE html>";

  return {
    ...file,
    element,
    doctypeHTML,
  };
}
