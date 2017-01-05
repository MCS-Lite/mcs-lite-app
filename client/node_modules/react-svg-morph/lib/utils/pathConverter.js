"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fromPolygon = fromPolygon;
exports.fromLine = fromLine;
exports.fromRect = fromRect;
exports.fromPath = fromPath;
exports.fromCircle = fromCircle;
exports.fromEllipse = fromEllipse;

function fromPolygon(polygon) {
    var points = polygon.points;
    var p = points.split(/\s+/);
    var path = "";
    var k = 0;
    var len = p.length;
    for (; k < len; k++) {
        path += (k && "L" || "M") + p[k];
    }
    return path + 'z';
}

function fromLine(line) {
    var x1 = line.x1;
    var y1 = line.y1;
    var x2 = line.x2;
    var y2 = line.y2;

    return 'M' + x1 + ',' + y1 + 'L' + x2 + ',' + y2 + 'z';
}

function fromRect(rect) {
    var x = rect.x;
    var y = rect.y;
    var rx = rect.rx;
    var ry = rect.ry;

    var h = rect.height;
    var w = rect.width;

    if (!rx && !ry) {
        return 'M' + x + ',' + y + 'l' + w + ',0l0,' + h + 'l-' + w + ',0z';
    }
    return 'M' + (x + rx) + ',' + y + 'l' + (w - rx * 2) + ',0' + 'a' + rx + ',' + ry + ' 0 0,1 ' + rx + ',' + ry + 'l0,' + (h - ry * 2) + 'a' + rx + ',' + ry + ' 0 0,1 -' + rx + ',' + ry + 'l' + (rx * 2 - w) + ',0' + 'a' + rx + ',' + ry + ' 0 0,1 -' + rx + ',-' + ry + 'l0,' + (ry * 2 - h) + 'a' + rx + ',' + ry + ' 0 0,1 ' + rx + ',-' + ry + 'z';
}

function fromPath(path) {
    return path.d;
}

function fromCircle(circle) {
    var cx = circle.cx;
    var cy = circle.cy;
    var r = circle.r;

    return 'M' + (cx - r) + ',' + cy + 'a' + r + ',' + r + ' 0 1,0 ' + r * 2 + ',0a' + r + ',' + r + ' 0 1,0 -' + r * 2 + ',0z';
}

function fromEllipse(ellipse) {
    var cx = ellipse.cx;
    var cy = ellipse.cy;
    var rx = ellipse.rx;
    var ry = ellipse.ry;

    return 'M' + (cx - rx) + ',' + cy + 'a' + rx + ',' + ry + ' 0 1,0 ' + rx * 2 + ',0a' + rx + ',' + ry + ' 0 1,0 -' + rx * 2 + ',0z';
}