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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var flatten_1 = __importDefault(require("ramda/src/flatten"));
var head_1 = __importDefault(require("ramda/src/head"));
var path_1 = __importDefault(require("ramda/src/path"));
var pathOr_1 = __importDefault(require("ramda/src/pathOr"));
var map_1 = __importDefault(require("ramda/src/map"));
var reduce_1 = __importDefault(require("ramda/src/reduce"));
var tail_1 = __importDefault(require("ramda/src/tail"));
var takeWhile_1 = __importDefault(require("ramda/src/takeWhile"));
var display_1 = require("../../../actions/display");
var notSharp = function (c) { return c !== '#'; };
exports.mergeRows = function (state) {
    if (state.length < 2) {
        return state;
    }
    var _a = reduce_1.default(function (_a, rowB) {
        var rowsAcc = _a[0], rowA = _a[1];
        var numberOfCells = path_1.default(['cells', 'length']);
        if (numberOfCells(rowA) !== 1 || numberOfCells(rowB) !== 1) {
            return [
                rowsAcc.concat([__assign({}, rowA, { id: takeWhile_1.default(notSharp, rowA.id).join('') })]),
                rowB,
            ];
        }
        var cellA = rowA.cells[0];
        var cellB = rowB.cells[0];
        var pluginName = path_1.default(['content', 'plugin', 'name']);
        var pluginVersion = path_1.default(['content', 'plugin', 'version']);
        var pluginMerge = path_1.default(['content', 'plugin', 'merge']);
        if (!pluginName(cellA) ||
            !pluginName(cellB) ||
            !pluginVersion(cellA) ||
            !pluginVersion(cellB) ||
            pluginName(cellA) !== pluginName(cellB) ||
            pluginVersion(cellA) !== pluginVersion(cellB) ||
            !pluginMerge(cellA)) {
            return [
                rowsAcc.concat([__assign({}, rowA, { id: takeWhile_1.default(notSharp, rowA.id).join('') })]),
                rowB,
            ];
        }
        return [
            rowsAcc,
            __assign({}, rowA, { id: takeWhile_1.default(notSharp, rowA.id).join(''), cells: [
                    __assign({}, cellA, { id: takeWhile_1.default(notSharp, cellA.id).join(''), content: __assign({}, cellA.content, { state: pluginMerge(cellA)([
                                pathOr_1.default({}, ['content', 'state'], cellA),
                                pathOr_1.default({}, ['content', 'state'], cellB),
                            ]) }) }),
                ] }),
        ];
    }, [[], head_1.default(state)], tail_1.default(state)), newCellsAcc = _a[0], lastRow = _a[1];
    return newCellsAcc.concat([lastRow]);
};
exports.splitRows = function (state) {
    return flatten_1.default(map_1.default(function (row) {
        if (!row.cells) {
            return [row];
        }
        if (row.cells.length !== 1) {
            return [row];
        }
        // tslint:disable-next-line:no-shadowed-variable
        var state = path_1.default(['cells', 0, 'content', 'state'], row);
        var split = path_1.default(['cells', 0, 'content', 'plugin', 'split'], row);
        if (!split) {
            return [row];
        }
        // tslint:disable-next-line:no-shadowed-variable
        return split(state).map(function (state, i) { return (__assign({}, row, { id: row.id + "#" + i, cells: [
                __assign({}, row.cells[0], { id: row.cells[0].id + "#" + i, content: __assign({}, row.cells[0].content, { state: state }) }),
            ] })); });
    }, state));
};
exports.mergeDecorator = function (action) { return function (state) {
    if (action.type !== display_1.SET_DISPLAY_MODE) {
        return state;
    }
    switch (action.mode) {
        case 'edit':
            return exports.mergeRows(state);
        case 'insert':
        case 'layout': {
            return exports.splitRows(state);
        }
        default:
            return state;
    }
}; };
//# sourceMappingURL=merge.js.map