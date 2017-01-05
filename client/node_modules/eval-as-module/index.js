var dirname = require('path').dirname
var Module = require('module')
var path = require('path')
var json = JSON.stringify

var originalFindPath = Module._findPath

/**
 * monkey patch findPath to handle fake directories better
 *
 * TODO: handle more types of request
 *
 * @param  {String} request
 * @param  {Array[String]} paths
 * @return {String}
 */

function findPath(request, paths) {
  if (paths.length == 1 && /^\.{2}/.test(request)) {
    paths[0] = path.dirname(paths[0])
    request = request.slice(1)
  }
  return originalFindPath(request, paths)
}

/**
 * run `js` as if it were a module at `path`
 *
 * @param {String} js
 * @param {String} path
 * @api private
 */

function run(js, path) {
  var m = new Module(path, module)
  Module._findPath = findPath
  m.paths = Module._nodeModulePaths(dirname(path))
  m.id = path
  m.filename = path
  js = 'module.return=eval(' + json(js) + ')'
  m._compile(js, path)
  Module._findPath = originalFindPath
  return m
}

module.exports = run
