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
var computeRowLevels = function (a, b) {
    var _a = a.cells, cells = _a === void 0 ? [] : _a, props = __rest(a, ["cells"]);
    var _b = b || {}, _c = _b.left, left = _c === void 0 ? 0 : _c, _d = _b.right, right = _d === void 0 ? 0 : _d, _e = _b.above, above = _e === void 0 ? 0 : _e, _f = _b.below, below = _f === void 0 ? 0 : _f;
    var newCells = [];
    if (cells.length) {
        newCells = cells.map(function (c, k) {
            return computeCellLevels(c, {
                left: k === 0 ? left + 1 : 0,
                right: k === cells.length - 1 ? right + 1 : 0,
                above: above + 1,
                below: below + 1,
            });
        });
    }
    delete props.levels;
    return __assign({ levels: { left: left, right: right, above: above, below: below } }, props, { cells: newCells });
};
var computeCellLevels = function (a, b) {
    var _a = a.rows, rows = _a === void 0 ? [] : _a, props = __rest(a, ["rows"]);
    var _b = b || {}, _c = _b.left, left = _c === void 0 ? 0 : _c, _d = _b.right, right = _d === void 0 ? 0 : _d, _e = _b.above, above = _e === void 0 ? 0 : _e, _f = _b.below, below = _f === void 0 ? 0 : _f;
    var newRows;
    if (rows.length) {
        newRows = rows.map(function (r, k) {
            return computeRowLevels(r, {
                left: left + 1,
                right: right + 1,
                above: k === 0 ? above + 1 : 0,
                below: k === rows.length - 1 ? below + 1 : 0,
            });
        });
    }
    delete props.levels; // eslint-disable-line prefer-reflect
    return __assign({ levels: { left: left, right: right, above: above, below: below } }, props, { rows: newRows });
};
exports.computeDropLevels = function (c) { return computeCellLevels(c); };
//# sourceMappingURL=level.js.map