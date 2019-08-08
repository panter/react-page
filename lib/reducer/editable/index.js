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
var cell_1 = require("../../actions/cell");
var order_1 = require("./helper/order");
var tree_1 = require("./helper/tree");
var tree_2 = require("./tree");
var editable_1 = require("../../types/editable");
exports.rawEditableReducer = function (state, action) {
    if (state === void 0) { state = {
        id: null,
        cells: [],
        config: {
            whitelist: [],
        },
    }; }
    var newCells = tree_1.decorate(tree_2.cells(state.cells, action));
    // eslint-disable-next-line default-case
    switch (action.type) {
        case cell_1.CELL_CREATE_FALLBACK:
            if (action.editable === state.id) {
                var c = __assign({}, editable_1.createCell(), { content: {
                        plugin: action.fallback,
                        state: action.fallback.createInitialState(),
                    }, id: action.ids[0] });
                newCells = tree_1.decorate(tree_2.cells([c], action));
            }
            break;
        default:
            break;
    }
    return __assign({}, state, { cells: newCells, cellOrder: order_1.cellOrder(newCells || []) });
};
exports.editable = exports.rawEditableReducer;
//# sourceMappingURL=index.js.map