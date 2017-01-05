import {
  resolve as resolvePath,
} from "path";

import {
  default as expect,
} from "expect";

import {
  WebpackNullEntry,
  WebpackScriptEntry,
  WebpackStyleEntry,
  ReactRenderToStringEntry,
} from "../index";

describe("entry", () => {
  describe("index", () => {
    it("should be exported", () => {
      expect(WebpackNullEntry).toExist();
      expect(WebpackScriptEntry).toExist();
      expect(WebpackStyleEntry).toExist();
      expect(ReactRenderToStringEntry).toExist();
    });
  });
});
