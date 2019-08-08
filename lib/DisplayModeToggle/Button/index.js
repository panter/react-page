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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Fab_1 = __importDefault(require("@material-ui/core/Fab"));
var device_js_1 = require("device.js");
var DisplayModeToggle = function (_a) {
    var description = _a.description, icon = _a.icon, onClick = _a.onClick, active = _a.active, disabled = _a.disabled;
    return (React.createElement("div", { className: "ory-controls-mode-toggle-button" },
        React.createElement("div", { className: "ory-controls-mode-toggle-button-inner" },
            React.createElement(Fab_1.default, { color: active ? 'secondary' : 'default', size: device_js_1.device.mobile ? 'small' : 'large', onClick: onClick, disabled: disabled }, icon)),
        React.createElement("div", { className: "ory-controls-mode-toggle-button-description" }, description)));
};
exports.default = DisplayModeToggle;
//# sourceMappingURL=index.js.map