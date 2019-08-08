"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var React = __importStar(require("react"));
var SettingsOverscan_1 = __importDefault(require("@material-ui/icons/SettingsOverscan"));
var react_redux_1 = require("react-redux");
var display_1 = require("@react-page/core/lib/actions/display");
var display_2 = require("@react-page/core/lib/selector/display");
var reselect_1 = require("reselect");
var index_1 = __importDefault(require("../Button/index"));
var Inner = function (props) { return (React.createElement(index_1.default, { icon: React.createElement(SettingsOverscan_1.default, null), description: props.label, active: props.isResizeMode, onClick: props.resizeMode })); };
var mapStateToProps = reselect_1.createStructuredSelector({ isResizeMode: display_2.isResizeMode });
var mapDispatchToProps = { resizeMode: display_1.resizeMode };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Inner);
//# sourceMappingURL=index.js.map