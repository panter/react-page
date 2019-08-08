"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
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
var index_1 = __importDefault(require("../Provider/index"));
var index_2 = __importDefault(require("./ToggleEdit/index"));
var index_3 = __importDefault(require("./ToggleInsert/index"));
var index_4 = __importDefault(require("./ToggleLayout/index"));
var index_5 = __importDefault(require("./TogglePreview/index"));
var index_6 = __importDefault(require("./ToggleResize/index"));
var defaultTranslations = {
    edit: 'Edit things',
    insert: 'Add things',
    layout: 'Move things',
    resize: 'Resize things',
    preview: 'Preview result',
};
var Inner = function (_a) {
    var _b = _a.translations, translations = _b === void 0 ? defaultTranslations : _b, rest = __rest(_a, ["translations"]);
    return (React.createElement(index_1.default, __assign({}, rest),
        React.createElement("div", { className: "ory-controls-mode-toggle-control-group" },
            React.createElement("div", { className: "ory-controls-mode-toggle-control" },
                React.createElement(index_2.default, { label: translations.edit }),
                React.createElement("div", { className: "ory-controls-mode-toggle-clearfix" })),
            React.createElement("div", { className: "ory-controls-mode-toggle-control" },
                React.createElement(index_3.default, { label: translations.insert }),
                React.createElement("div", { className: "ory-controls-mode-toggle-clearfix" })),
            React.createElement("div", { className: "ory-controls-mode-toggle-control" },
                React.createElement(index_4.default, { label: translations.layout }),
                React.createElement("div", { className: "ory-controls-mode-toggle-clearfix" })),
            React.createElement("div", { className: "ory-controls-mode-toggle-control" },
                React.createElement(index_6.default, { label: translations.resize }),
                React.createElement("div", { className: "ory-controls-mode-toggle-clearfix" })),
            React.createElement("div", { className: "ory-controls-mode-toggle-control" },
                React.createElement(index_5.default, { label: translations.preview }),
                React.createElement("div", { className: "ory-controls-mode-toggle-clearfix" })))));
};
exports.default = Inner;
//# sourceMappingURL=index.js.map