'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.normalizePaths = normalizePaths;
exports.getProgress = getProgress;

var _svglite = require('./svglite');

var _helpers = require('./helpers');

function normalizePaths(fromPaths, toPaths, _options) {
    var options = _options || {};
    var max = Math.max(fromPaths.length, toPaths.length);
    var toBB, i;

    for (i = 0; i < max; i++) {
        if (!fromPaths[i]) {
            if (!!toPaths[i]) {
                toBB = (0, _svglite.curvePathBBox)((0, _svglite.path2curve)(toPaths[i].path));
                fromPaths.push({
                    path: 'M' + toBB.cx + ',' + toBB.cy + 'l0,0',
                    attrs: {},
                    style: {},
                    trans: {
                        rotate: [0, toBB.cx, toBB.cy]
                    }
                });
            } else {
                fromPaths.push({
                    path: 'M0,0l0,0',
                    attrs: {},
                    style: {},
                    trans: {
                        rotate: [0, 0, 0]
                    }
                });
            }
        }

        if (!toPaths[i]) {
            if (!!fromPaths[i]) {
                toBB = (0, _svglite.curvePathBBox)((0, _svglite.path2curve)(fromPaths[i].path));
                toPaths.push({
                    path: 'M' + toBB.cx + ',' + toBB.cy + 'l0,0',
                    attrs: {},
                    style: {},
                    trans: {
                        rotate: [0, toBB.cx, toBB.cy]
                    }
                });
            } else {
                toPaths.push({
                    path: 'M0,0l0,0',
                    attrs: {},
                    style: {},
                    trans: {
                        rotate: [0, 0, 0]
                    }
                });
            }
        }
    }

    for (i = 0; i < max; i++) {
        var fromIconItem = fromPaths[i];
        var toIconItem = toPaths[i];

        // Calculate from/to curve data and set to fromIcon/toIcon
        var curves = (0, _svglite.path2curve)(fromPaths[i].path, toPaths[i].path);
        fromIconItem.curve = curves[0];
        toIconItem.curve = curves[1];
        // Normalize from/to attrs
        var attrsNorm = (0, _helpers.styleToNorm)(fromPaths[i].attrs, toPaths[i].attrs);
        fromIconItem.attrsNorm = attrsNorm[0];
        toIconItem.attrsNorm = attrsNorm[1];
        fromIconItem.attrs = (0, _helpers.styleNormToString)(fromIconItem.attrsNorm);
        toIconItem.attrs = (0, _helpers.styleNormToString)(toIconItem.attrsNorm);

        // Normalize from/to style
        var styleNorm = (0, _helpers.styleToNorm)(fromPaths[i].style, toPaths[i].style);
        fromIconItem.styleNorm = styleNorm[0];
        toIconItem.styleNorm = styleNorm[1];
        fromIconItem.style = (0, _helpers.styleNormToString)(fromIconItem.styleNorm);
        toIconItem.style = (0, _helpers.styleNormToString)(toIconItem.styleNorm);

        // Calculate from/to transform
        toBB = (0, _svglite.curvePathBBox)(toIconItem.curve);
        toIconItem.trans = {
            rotate: [0, toBB.cx, toBB.cy]
        };
        // TODO rotation accept
        var rotation = options.rotation,
            degAdd = undefined;
        if (rotation === 'random') {
            rotation = Math.random() < 0.5 ? 'counterclock' : 'clock';
        }
        switch (rotation) {
            case 'none':
                if (!!fromIconItem.trans.rotate) {
                    toIconItem.trans.rotate[0] = fromIconItem.trans.rotate[0];
                }
                break;
            case 'counterclock':
                if (!!fromIconItem.trans.rotate) {
                    toIconItem.trans.rotate[0] = fromIconItem.trans.rotate[0] - 360;
                    degAdd = -fromIconItem.trans.rotate[0] % 360;
                    toIconItem.trans.rotate[0] += degAdd < 180 ? degAdd : degAdd - 360;
                } else {
                    toIconItem.trans.rotate[0] = -360;
                }
                break;
            default:
                // Clockwise
                if (!!fromIconItem.trans.rotate) {
                    toIconItem.trans.rotate[0] = fromIconItem.trans.rotate[0] + 360;
                    degAdd = fromIconItem.trans.rotate[0] % 360;
                    toIconItem.trans.rotate[0] += degAdd < 180 ? -degAdd : 360 - degAdd;
                } else {
                    toIconItem.trans.rotate[0] = 360;
                }
                break;
        }
    }

    return {
        to: toPaths,
        from: fromPaths
    };
}

function getProgress(fromPaths, toPaths, progress) {
    // TODO easing
    // progress=easings[this._easing](progress);
    var i = 0;
    var newPaths = [];
    var len = fromPaths.length;
    // Update path/attrs/transform
    for (; i < len; i++) {
        newPaths[i] = {};
        newPaths[i].curve = (0, _helpers.curveCalc)(fromPaths[i].curve, toPaths[i].curve, progress);
        newPaths[i].path = (0, _svglite.path2string)(newPaths[i].curve);

        newPaths[i].attrsNorm = (0, _helpers.styleNormCalc)(fromPaths[i].attrsNorm, toPaths[i].attrsNorm, progress);
        newPaths[i].attrs = (0, _helpers.styleNormToString)(newPaths[i].attrsNorm);

        newPaths[i].styleNorm = (0, _helpers.styleNormCalc)(fromPaths[i].styleNorm, toPaths[i].styleNorm, progress);
        newPaths[i].style = (0, _helpers.styleNormToString)(newPaths[i].styleNorm);

        newPaths[i].trans = (0, _helpers.transCalc)(fromPaths[i].trans, toPaths[i].trans, progress);
        newPaths[i].transStr = (0, _helpers.trans2string)(newPaths[i].trans);
    }

    return newPaths;
}