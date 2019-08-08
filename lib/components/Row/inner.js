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
var classnames_1 = __importDefault(require("classnames"));
var Cell_1 = __importDefault(require("../Cell"));
var Inner = function (_a) {
    var editable = _a.editable, ancestors = _a.ancestors, _b = _a.node, id = _b.id, hover = _b.hover, _c = _b.cells, cells = _c === void 0 ? [] : _c, hasInlineChildren = _b.hasInlineChildren, containerHeight = _a.containerHeight, blurAllCells = _a.blurAllCells, containerWidth = _a.containerWidth;
    var _d;
    return (React.createElement("div", { className: classnames_1.default('ory-row', (_d = {
                'ory-row-is-hovering-this': Boolean(hover)
            },
            _d["ory-row-is-hovering-" + (hover || '')] = Boolean(hover),
            _d['ory-row-has-floating-children'] = hasInlineChildren,
            _d)), onClick: blurAllCells }, cells.map(function (c) { return (React.createElement(Cell_1.default, { rowWidth: containerWidth, rowHeight: containerHeight, ancestors: ancestors.concat([id]), editable: editable, key: c, id: c })); })));
};
exports.default = Inner;
//# sourceMappingURL=inner.js.map