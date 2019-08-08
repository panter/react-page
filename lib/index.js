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
var plugin_1 = __importDefault(require("@react-page/core/lib/service/plugin"));
var editable_1 = require("@react-page/core/lib/reducer/editable");
var gridClass = function (size) {
    if (size === void 0) { size = 12; }
    return "ory-cell-sm-" + size + " ory-cell-xs-12";
};
var HTMLRow = function (_a) {
    var _b = _a.cells, cells = _b === void 0 ? [] : _b, className = _a.className, hasInlineChildren = _a.hasInlineChildren;
    return (React.createElement("div", { className: classnames_1.default('ory-row', className, {
            'ory-row-has-floating-children': hasInlineChildren,
        }) }, cells.map(function (c) { return (React.createElement(HTMLCell, __assign({ key: c.id }, c))); })));
};
// eslint-disable-next-line no-empty-function
var noop = function () {
    return;
};
var HTMLCell = function (props) {
    var _a;
    var _b = props.rows, rows = _b === void 0 ? [] : _b, _c = props.layout, layout = _c === void 0 ? {} : _c, _d = props.content, content = _d === void 0 ? {} : _d, hasInlineNeighbour = props.hasInlineNeighbour, inline = props.inline, size = props.size, id = props.id;
    var cn = classnames_1.default('ory-cell', gridClass(size), (_a = {
            'ory-cell-has-inline-neighbour': hasInlineNeighbour
        },
        _a["ory-cell-inline-" + (inline || '')] = inline,
        _a));
    if (layout.plugin) {
        var state = layout.state, _e = layout.plugin, Component = _e.Component, name_1 = _e.name, version = _e.version;
        return (React.createElement("div", { className: cn },
            React.createElement("div", { className: "ory-cell-inner" },
                React.createElement(Component, { readOnly: true, state: state, onChange: noop, id: id, name: name_1, focused: false, version: version }, rows.map(function (r) { return (React.createElement(HTMLRow, __assign({ key: r.id }, r, { className: "ory-cell-inner" }))); })))));
    }
    else if (content.plugin) {
        var state = content.state, _f = content.plugin, Component = _f.Component, name_2 = _f.name, version = _f.version;
        return (React.createElement("div", { className: cn },
            React.createElement("div", { className: "ory-cell-inner ory-cell-leaf" },
                React.createElement(Component, { isPreviewMode: true, readOnly: true, state: state, onChange: noop, id: id, name: name_2, focused: false, version: version, isEditMode: false, isLayoutMode: false, isResizeMode: false, isInsertMode: false }))));
    }
    else if (rows.length > 0) {
        return (React.createElement("div", { className: cn }, rows.map(function (r) { return (React.createElement(HTMLRow, __assign({ key: r.id }, r, { className: "ory-cell-inner" }))); })));
    }
    return (React.createElement("div", { className: cn },
        React.createElement("div", { className: "ory-cell-inner" })));
};
exports.HTMLRenderer = function (_a) {
    var state = _a.state, plugins = _a.plugins;
    var service = new plugin_1.default(plugins);
    var props = editable_1.editable(service.unserialize(state), { type: 'renderer/noop' });
    return React.createElement(HTMLRow, __assign({}, props));
};
//# sourceMappingURL=index.js.map