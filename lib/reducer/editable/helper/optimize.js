"use strict";
/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var empty_1 = require("./empty");
exports.flatten = function (c, n) {
    return c.concat(n);
};
exports.optimizeCells = function (cells) {
    if (cells === void 0) { cells = []; }
    return cells.filter(empty_1.emptyFilter);
};
exports.optimizeRows = function (rows) {
    if (rows === void 0) { rows = []; }
    return rows.filter(empty_1.emptyFilter);
};
exports.optimizeCell = function (_a) {
    var rows = _a.rows, other = __rest(_a, ["rows"]);
    return (__assign({}, other, { rows: (rows || [])
            .map(function (r) {
            var _a = r.cells, cells = _a === void 0 ? [] : _a;
            if (cells.length !== 1) {
                return [r];
            }
            var _b = cells[0], _c = _b.rows, cellRows = _c === void 0 ? [] : _c, layout = _b.layout;
            if (cellRows.length > 0 && !layout) {
                return cellRows;
            }
            return [r];
        })
            .reduce(exports.flatten, []) }));
};
exports.optimizeRow = function (_a) {
    var cells = _a.cells, other = __rest(_a, ["cells"]);
    return (__assign({}, other, { cells: (cells || [])
            .map(function (c) {
            var _a = c.rows, rows = _a === void 0 ? [] : _a;
            if (rows.length !== 1 || c.layout) {
                return [c];
            }
            var _b = rows[0].cells, rowCells = _b === void 0 ? [] : _b;
            if (rowCells.length === 1) {
                return rowCells;
            }
            return [c];
        })
            .reduce(exports.flatten, []) }));
};
//# sourceMappingURL=optimize.js.map