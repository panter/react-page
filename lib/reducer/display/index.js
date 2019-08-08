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
var display_1 = require("../../actions/display");
exports.display = function (state, action) {
    if (state === void 0) { state = {
        previous: display_1.DEFAULT_DISPLAY_MODE,
        mode: display_1.DEFAULT_DISPLAY_MODE,
    }; }
    switch (action.type) {
        case display_1.SET_PREVIOUS_DISPLAY_MODE:
            return __assign({}, state, { mode: state.previous === state.mode ? action.fallback : state.previous });
        case display_1.SET_DISPLAY_MODE:
            return {
                previous: action.mode === state.mode && action.remember
                    ? state.previous
                    : action.mode,
                mode: action.mode,
            };
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map