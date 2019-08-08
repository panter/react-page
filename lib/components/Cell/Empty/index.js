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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Empty = function (_a) {
    var _b = _a.id, id = _b === void 0 ? 'no id given' : _b, props = __rest(_a, ["id"]);
    return (React.createElement("div", { className: "ory-cell-empty" },
        React.createElement("strong", null, "An error occurred!"),
        React.createElement("small", null,
            React.createElement("dl", null,
                React.createElement("dt", null, "Cause:"),
                React.createElement("dd", null, "The content plugin could not be found. Check the console to investigate the cause."),
                React.createElement("dt", null, "Cell:"),
                React.createElement("dd", null, id),
                React.createElement("dt", null, "Data:"),
                React.createElement("dd", null,
                    React.createElement("code", null, JSON.stringify(props, null, 4)))))));
};
exports.default = Empty;
//# sourceMappingURL=index.js.map