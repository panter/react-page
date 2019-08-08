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
var debug_1 = require("redux-undo/lib/debug");
var redux_undo_1 = __importStar(require("redux-undo"));
var editable_1 = require("../editable");
var editables_1 = require("../../actions/editables");
var core_1 = require("../../actions/cell/core");
var const_1 = require("../../const");
var insert_1 = require("../../actions/cell/insert");
if (!const_1.isProduction) {
    debug_1.set(true);
}
var inner = redux_undo_1.default(function (
// tslint:disable-next-line:no-any
state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        default:
            // tslint:disable-next-line:no-any
            return state.map(function (e) { return editable_1.editable(e, action); });
    }
}, {
    filter: redux_undo_1.includeAction([
        core_1.CELL_UPDATE_CONTENT,
        core_1.CELL_UPDATE_LAYOUT,
        core_1.CELL_REMOVE,
        core_1.CELL_RESIZE,
        insert_1.CELL_INSERT_ABOVE,
        insert_1.CELL_INSERT_BELOW,
        insert_1.CELL_INSERT_LEFT_OF,
        insert_1.CELL_INSERT_RIGHT_OF,
        insert_1.CELL_INSERT_INLINE_LEFT,
        insert_1.CELL_INSERT_INLINE_RIGHT,
    ]),
    // initTypes: [UPDATE_EDITABLE],
    neverSkipReducer: true,
});
exports.editables = function (state, action) {
    if (state === void 0) { state = {
        past: [],
        present: [],
        future: [],
    }; }
    var _a = state.past, past = _a === void 0 ? [] : _a, _b = state.present, present = _b === void 0 ? [] : _b, _c = state.future, future = _c === void 0 ? [] : _c;
    switch (action.type) {
        case editables_1.UPDATE_EDITABLE:
            return inner({
                past: past.map(function (e) { return e.filter(function (_a) {
                    var id = _a.id;
                    return id !== action.editable.id;
                }).concat([
                    // we need to run the rawreducer once or the history initial state will be inconsistent.
                    // resolves https://github.com/ory/editor/pull/117#issuecomment-242942796
                    // ...past,
                    editable_1.editable(action.editable, action),
                ]); }),
                present: inner(present.filter(function (_a) {
                    var id = _a.id;
                    return id !== action.editable.id;
                }).concat([
                    // we need to run the rawreducer once or the history initial state will be inconsistent.
                    // resolves https://github.com/ory/editor/pull/117#issuecomment-242942796
                    editable_1.editable(action.editable, action),
                ]), undefined),
                future: future,
            }, undefined);
        default:
            return inner(state, action);
    }
};
//# sourceMappingURL=index.js.map