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
var pathOr_1 = __importDefault(require("ramda/src/pathOr"));
var optimize_1 = require("./helper/optimize");
var merge_1 = require("./helper/merge");
var hover_1 = require("./helper/hover");
var sizing_1 = require("./helper/sizing");
var inline_1 = require("./helper/inline");
var editable_1 = require("../../types/editable");
var cell_1 = require("../../actions/cell");
var inner = function (cb, action) { return function (state) {
    return cb(state, action);
}; };
var identity = function (state) { return state; };
exports.cell = function (s, a) {
    return optimize_1.optimizeCell((function (state, action) {
        var reduce = function () {
            var content = pathOr_1.default(identity, ['content', 'plugin', 'reducer'], state);
            var layout = pathOr_1.default(identity, ['layout', 'plugin', 'reducer'], state);
            return content(layout(__assign({}, state, { hover: null, rows: exports.rows(state.rows, action) }), action), action);
        };
        switch (action.type) {
            case cell_1.CELL_UPDATE_CONTENT:
                if (action.id === state.id) {
                    // If this cell is being updated, set the data
                    var reduced = reduce();
                    return __assign({}, reduced, { content: __assign({}, (state.content || {}), { state: __assign({}, pathOr_1.default({}, ['content', 'state'], reduced), action.state) }) });
                }
                return reduce();
            case cell_1.CELL_UPDATE_LAYOUT:
                if (action.id === state.id) {
                    // If this cell is being updated, set the data
                    var reduced = reduce();
                    return __assign({}, reduced, { layout: __assign({}, (state.layout || {}), { state: __assign({}, pathOr_1.default({}, ['layout', 'state'], reduced), action.state) }) });
                }
                return reduce();
            case cell_1.CELL_FOCUS:
                if (action.id === state.id) {
                    // If this cell is being focused, set the data
                    return __assign({}, reduce(), { focused: true, focusSource: action.source });
                }
                return __assign({}, reduce(), { focused: false, focusSource: null });
            case cell_1.CELL_BLUR:
                if (action.id === state.id) {
                    // If this cell is being blurred, set the data
                    return __assign({}, reduce(), { focused: false, focusSource: null });
                }
                return reduce();
            case cell_1.CELL_BLUR_ALL:
                return __assign({}, reduce(), { focused: false });
            case cell_1.CELL_DRAG_HOVER:
                if (hover_1.isHoveringThis(state, action)) {
                    // if this is the cell we're hovering, set the hover attribute
                    return __assign({}, reduce(), { hover: action.position });
                }
                // or remove it if not
                return reduce();
            case cell_1.CELL_INSERT_ABOVE:
                if (hover_1.isHoveringThis(state, action)) {
                    return __assign({}, editable_1.createCell(), { id: action.ids[0], hover: null, rows: exports.rows([
                            __assign({}, editable_1.createRow(), { id: action.ids[1], cells: [__assign({}, action.item, { id: action.ids[2], inline: null })] }),
                            __assign({}, editable_1.createRow(), { id: action.ids[3], cells: [__assign({}, reduce(), { id: action.ids[4] })] }),
                        ], __assign({}, action, { hover: null })) });
                }
                return reduce();
            case cell_1.CELL_INSERT_BELOW:
                if (hover_1.isHoveringThis(state, action)) {
                    return __assign({}, editable_1.createCell(), { id: action.ids[0], hover: null, rows: exports.rows([
                            __assign({}, editable_1.createRow(), { id: action.ids[1], cells: [__assign({}, reduce(), { id: action.ids[2] })] }),
                            __assign({}, editable_1.createRow(), { id: action.ids[3], cells: [__assign({}, action.item, { id: action.ids[4], inline: null })] }),
                        ], __assign({}, action, { hover: null })) });
                }
                return reduce();
            default:
                return reduce();
        }
    })(s, a));
};
exports.cells = function (s, a) {
    if (s === void 0) { s = []; }
    return optimize_1.optimizeCells((function (state, action) {
        switch (action.type) {
            case cell_1.CELL_RESIZE:
                // tslint:disable-next-line:no-any
                return sizing_1.resizeCells(state.map(inner(exports.cell, action)), action);
            case cell_1.CELL_INSERT_BELOW:
            case cell_1.CELL_INSERT_ABOVE:
                return state
                    .filter(function (c) { return c.id !== action.item.id; })
                    .map(inner(exports.cell, action));
            case cell_1.CELL_INSERT_LEFT_OF:
                return state
                    .filter(function (c) { return c.id !== action.item.id; })
                    .map(function (c) {
                    return hover_1.isHoveringThis(c, action)
                        ? [
                            __assign({}, action.item, { id: action.ids[0], inline: null }),
                            __assign({}, c, { id: action.ids[1] }),
                        ]
                        : [c];
                })
                    .reduce(optimize_1.flatten, [])
                    .map(inner(exports.cell, action));
            case cell_1.CELL_INSERT_RIGHT_OF:
                return state
                    .filter(function (c) { return c.id !== action.item.id; })
                    .map(function (c) {
                    return hover_1.isHoveringThis(c, action)
                        ? [
                            __assign({}, c, { id: action.ids[0] }),
                            __assign({}, action.item, { id: action.ids[1], inline: null }),
                        ]
                        : [c];
                })
                    .reduce(optimize_1.flatten, [])
                    .map(inner(exports.cell, action));
            case cell_1.CELL_INSERT_INLINE_RIGHT:
            case cell_1.CELL_INSERT_INLINE_LEFT:
                return state
                    .filter(function (c) { return c.id !== action.item.id; })
                    .map(function (c) {
                    if (hover_1.isHoveringThis(c, action)) {
                        return [
                            __assign({}, editable_1.createCell(), { id: action.ids[0], rows: [
                                    __assign({}, editable_1.createRow(), { id: action.ids[1], cells: [
                                            __assign({}, action.item, { inline: action.type === cell_1.CELL_INSERT_INLINE_RIGHT
                                                    ? 'right'
                                                    : 'left', id: action.ids[2], size: 0 }),
                                            __assign({}, c, { id: action.ids[3], inline: null, hasInlineNeighbour: action.ids[2], size: 0 }),
                                        ] }),
                                ] }),
                        ];
                    }
                    return [c];
                })
                    .reduce(optimize_1.flatten, [])
                    .map(inner(exports.cell, action));
            case cell_1.CELL_REMOVE:
                return state
                    .filter(function (_a) {
                    var id = _a.id;
                    return id !== action.id;
                })
                    .map(inner(exports.cell, action));
            default:
                return state.map(inner(exports.cell, action));
        }
    })(s, a));
};
exports.row = function (s, a) {
    return inline_1.computeRow(optimize_1.optimizeRow((function (state, action) {
        var reduce = function () { return (__assign({}, state, { hover: null, cells: exports.cells(state.cells, action) })); };
        switch (action.type) {
            case cell_1.CELL_INSERT_LEFT_OF:
                if (!hover_1.isHoveringThis(state, action)) {
                    return reduce();
                }
                return __assign({}, state, { hover: null, cells: exports.cells([
                        __assign({}, action.item, { id: action.ids[0], inline: null })
                    ].concat(state.cells), __assign({}, action, { hover: null })) });
            case cell_1.CELL_INSERT_RIGHT_OF:
                if (!hover_1.isHoveringThis(state, action)) {
                    return reduce();
                }
                return __assign({}, state, { hover: null, cells: exports.cells(state.cells.concat([
                        __assign({}, action.item, { id: action.ids[0], inline: null }),
                    ]), __assign({}, action, { hover: null })) });
            case cell_1.CELL_DRAG_HOVER:
                if (hover_1.isHoveringThis(state, action)) {
                    return __assign({}, reduce(), { hover: action.position });
                }
                return reduce();
            default:
                return reduce();
        }
    })(s, a)));
};
exports.rows = function (s, a) {
    if (s === void 0) { s = []; }
    return optimize_1.optimizeRows(
    // tslint:disable-next-line:no-any
    merge_1.mergeDecorator(a)((function (state, action) {
        var reduce = function () { return state.map(inner(exports.row, action)); };
        switch (action.type) {
            case cell_1.CELL_INSERT_ABOVE:
                return state
                    .map(function (r) {
                    return hover_1.isHoveringThis(r, action)
                        ? [
                            __assign({}, editable_1.createRow(), { cells: [
                                    __assign({}, action.item, { id: action.ids[1], inline: null }),
                                ], id: action.ids[0] }),
                            __assign({}, r, { id: action.ids[2] }),
                        ]
                        : [r];
                })
                    .reduce(optimize_1.flatten, [])
                    .map(inner(exports.row, action));
            case cell_1.CELL_INSERT_BELOW:
                return state
                    .map(function (r) {
                    return hover_1.isHoveringThis(r, action)
                        ? [
                            __assign({}, r, { id: action.ids[0] }),
                            __assign({}, editable_1.createRow(), { cells: [
                                    __assign({}, action.item, { id: action.ids[2], inline: null }),
                                ], id: action.ids[1] }),
                        ]
                        : [r];
                })
                    .reduce(optimize_1.flatten, [])
                    .map(inner(exports.row, action));
            default:
                return reduce();
        }
    })(s, a)));
};
//# sourceMappingURL=tree.js.map