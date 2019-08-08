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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var core_1 = require("@react-page/core");
var IconButton = core_1.lazyLoad(function () { return Promise.resolve().then(function () { return __importStar(require('@material-ui/core/IconButton')); }); });
exports.makeTagNode = function (Tag) {
    var NodeComponent = function (_a) {
        var attributes = _a.attributes, children = _a.children, node = _a.node;
        var align = node.data.get('align');
        return (React.createElement(Tag, __assign({}, attributes, { style: { textAlign: align } }), children));
    };
    NodeComponent.displayName = Tag + "-node";
    return NodeComponent;
};
exports.makeTagMark = function (Tag) {
    var MarkComponent = function (_a) {
        var children = _a.children;
        return React.createElement(Tag, null, children);
    };
    MarkComponent.displayName = Tag + "-mark";
    return MarkComponent;
};
exports.ToolbarButton = function (_a) {
    var icon = _a.icon, isActive = _a.isActive, onClick = _a.onClick, _b = _a.disabled, disabled = _b === void 0 ? false : _b;
    return (React.createElement(IconButton, { onMouseDown: onClick, style: isActive
            ? { color: 'rgb(0, 188, 212)' }
            : disabled
                ? { color: 'gray' }
                : { color: 'white' }, disabled: disabled }, icon));
};
//# sourceMappingURL=helpers.js.map