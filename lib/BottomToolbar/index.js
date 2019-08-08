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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Drawer_1 = __importDefault(require("@material-ui/core/Drawer"));
var React = __importStar(require("react"));
var index_1 = __importDefault(require("../ThemeProvider/index"));
var darkBlack = 'rgba(0, 0, 0, 0.87)';
var BottomToolbar = function (_a) {
    var _b = _a.open, open = _b === void 0 ? false : _b, children = _a.children, className = _a.className, theme = _a.theme;
    return (React.createElement(index_1.default, { theme: theme },
        React.createElement(Drawer_1.default, { variant: "persistent", className: className, open: open, anchor: "bottom", PaperProps: {
                style: {
                    backgroundColor: 'transparent',
                    border: 'none',
                },
            } },
            React.createElement("div", { style: {
                    border: darkBlack + " 1px solid",
                    borderRadius: '4px 4px 0 0',
                    backgroundColor: darkBlack,
                    padding: '12px 24px',
                    margin: 'auto',
                } }, children))));
};
exports.default = BottomToolbar;
//# sourceMappingURL=index.js.map