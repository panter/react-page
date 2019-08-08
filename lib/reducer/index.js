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
var redux_1 = require("redux");
var editables_1 = require("./editables");
var display_1 = require("./display");
var focus_1 = require("./focus");
var settings_1 = require("./settings");
var reducer = redux_1.combineReducers({
    editables: editables_1.editables,
    display: display_1.display,
    focus: focus_1.focus,
    settings: settings_1.settings,
});
exports.reducer = reducer;
exports.default = redux_1.combineReducers({ reactPage: reducer });
//# sourceMappingURL=index.js.map