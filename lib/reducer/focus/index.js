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
Object.defineProperty(exports, "__esModule", { value: true });
var cell_1 = require("../../actions/cell");
exports.focus = function (state, action) {
    if (state === void 0) { state = ''; }
    switch (action.type) {
        case cell_1.CELL_FOCUS:
            return action.id;
        case cell_1.CELL_BLUR_ALL:
            return '';
        case cell_1.CELL_BLUR:
            return action.id === state ? '' : state;
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map