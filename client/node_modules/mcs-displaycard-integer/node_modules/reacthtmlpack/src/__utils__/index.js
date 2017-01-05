import {
  default as fs,
} from "fs";

export function readFileAsContent (filepath) {
  return fs.readFileSync(filepath, "utf8").trim();// trim to remove the newline before EOF
}
