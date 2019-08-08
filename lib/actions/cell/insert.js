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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid = __importStar(require("uuid"));
exports.CELL_INSERT_ABOVE = 'CELL_INSERT_ABOVE';
exports.CELL_INSERT_BELOW = 'CELL_INSERT_BELOW';
exports.CELL_INSERT_LEFT_OF = 'CELL_INSERT_LEFT_OF';
exports.CELL_INSERT_RIGHT_OF = 'CELL_INSERT_RIGHT_OF';
exports.CELL_INSERT_INLINE_LEFT = 'CELL_INSERT_INLINE_LEFT';
exports.CELL_INSERT_INLINE_RIGHT = 'CELL_INSERT_INLINE_RIGHT';
var gen = function (c) {
    if (c === void 0) { c = 1; }
    var ret = [];
    for (var i = 0; i <= c; i++) {
        ret.push(uuid.v4());
    }
    return ret;
};
var insert = function (type) { return function (item, _a, level, ids) {
    var hover = _a.id, inline = _a.inline, hasInlineNeighbour = _a.hasInlineNeighbour;
    if (level === void 0) { level = 0; }
    if (ids === void 0) { ids = []; }
    var l = level;
    switch (type) {
        case exports.CELL_INSERT_ABOVE:
        case exports.CELL_INSERT_BELOW: {
            if ((inline || hasInlineNeighbour) && level < 1) {
                l = 1;
            }
            break;
        }
        case exports.CELL_INSERT_LEFT_OF:
        case exports.CELL_INSERT_RIGHT_OF: {
            if ((inline || hasInlineNeighbour) && level < 1) {
                l = 1;
            }
            break;
        }
        default:
    }
    return {
        type: type,
        ts: new Date(),
        item: item,
        hover: hover,
        level: l,
        ids: ids.length > 0 ? ids : gen(5),
    };
}; };
/**
 * Insert a cell below of the hovering cell.
 */
exports.insertCellBelow = insert(exports.CELL_INSERT_BELOW);
/**
 * Insert a cell above of the hovering cell.
 */
exports.insertCellAbove = insert(exports.CELL_INSERT_ABOVE);
/**
 * Insert a cell right of the hovering cell.
 */
exports.insertCellRightOf = insert(exports.CELL_INSERT_RIGHT_OF);
/**
 * Insert a cell left of the hovering cell.
 */
exports.insertCellLeftOf = insert(exports.CELL_INSERT_LEFT_OF);
/**
 * Insert a cell inside the hovering cell, on the left.
 */
exports.insertCellLeftInline = insert(exports.CELL_INSERT_INLINE_LEFT);
/**
 * Insert a cell inside the hovering cell, on the right.
 */
exports.insertCellRightInline = insert(exports.CELL_INSERT_INLINE_RIGHT);
exports.insertActions = {
    insertCellRightInline: exports.insertCellRightInline,
    insertCellLeftInline: exports.insertCellLeftInline,
    insertCellLeftOf: exports.insertCellLeftOf,
    insertCellRightOf: exports.insertCellRightOf,
    insertCellAbove: exports.insertCellAbove,
    insertCellBelow: exports.insertCellBelow,
    insert: insert,
};
//# sourceMappingURL=insert.js.map