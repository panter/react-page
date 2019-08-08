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
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_CELLS_PER_ROW = 12;
/**
 * Sum up cell sizes: Σ(cell[size]).
 */
exports.sumSizes = function (cells) {
    if (cells === void 0) { cells = []; }
    return cells.reduce(
    // tslint:disable-next-line:no-any
    function (_a, _b) {
        var _c = _a.size, p = _c === void 0 ? 99 : _c, a = _a.inline;
        var _d = _b.size, c = _d === void 0 ? 99 : _d, b = _b.inline;
        return ({
            size: (a ? 0 : 1) * p + (b ? 0 : 1) * c,
        });
    }, { size: 0 }).size;
};
/**
 * Updates each cell's size boundaries.
 */
exports.computeBounds = function (cells) {
    if (cells === void 0) { cells = []; }
    return cells.map(function (c, k) { return (__assign({}, c, { bounds: {
            left: k > 0 ? cells[k - 1].size + c.size - 1 : 0,
            right: k === cells.length - 1 ? 0 : c.size - 1 + cells[k + 1].size,
        } })); });
};
/**
 * Computes if a cell is resizable.
 */
exports.computeResizeable = function (cells) {
    if (cells === void 0) { cells = []; }
    return cells.map(function (c, k) { return (__assign({}, c, { resizable: cells.length > 1 && k !== cells.length - 1 })); });
};
/**
 * Computes sizes an inline element was found.
 */
exports.computeInlines = function (cells) {
    if (cells === void 0) { cells = []; }
    if (cells.length !== 2 || !cells[0].inline) {
        return cells.map(function (c) { return (__assign({}, c, { inline: null, hasInlineNeighbour: null })); });
    }
    var inline = cells[0].inline;
    return [
        __assign({}, cells[0], { resizable: true, size: cells[0].size || Math.round(MAX_CELLS_PER_ROW / 2), bounds: {
                left: inline === 'left' ? 0 : MAX_CELLS_PER_ROW - 1,
                right: inline === 'right' ? 0 : MAX_CELLS_PER_ROW - 1,
            } }),
        __assign({}, cells[1], { bounds: { left: 0, right: 0 }, size: 12, hasInlineNeighbour: cells[0].id }),
    ];
};
/**
 * Resize cells.
 */
exports.resizeCells = function (cells, _a) {
    if (cells === void 0) { cells = []; }
    var id = _a.id, size = _a.size;
    var prev = 0;
    return cells.map(function (c) {
        if (prev > 0) {
            var ret = __assign({}, c, { size: c.size + prev - size });
            prev = 0;
            return ret;
        }
        else if (id === c.id) {
            if (!c.inline) {
                prev = c.size;
            }
            return __assign({}, c, { size: size });
        }
        return c;
    });
};
/**
 * Balance cell sizes.
 *
 * @param {[...cell]} cells
 * @return {[...cell]}
 */
exports.computeSizes = function (cells) {
    if (cells === void 0) { cells = []; }
    var total = exports.sumSizes(cells);
    if (total === MAX_CELLS_PER_ROW) {
        return cells;
    }
    var count = cells.length;
    var sizePerCell = Math.floor(MAX_CELLS_PER_ROW / count);
    var spaceLeft = MAX_CELLS_PER_ROW - sizePerCell * (count - 1);
    return cells.map(function (c, k) { return (__assign({}, c, { size: k === count - 1 ? spaceLeft : sizePerCell })); });
};
//# sourceMappingURL=sizing.js.map