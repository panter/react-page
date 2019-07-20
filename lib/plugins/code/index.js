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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
/* eslint-disable prefer-reflect, default-case, react/display-name */
var React = __importStar(require("react"));
var Code_1 = __importDefault(require("@material-ui/icons/Code"));
var slate_1 = require("slate");
var helpers_1 = require("../../helpers");
var Plugin_1 = __importDefault(require("../Plugin"));
var node_1 = __importDefault(require("./node"));
var DEFAULT_NODE_1 = __importDefault(require("../DEFAULT_NODE"));
exports.CODE = 'CODE/CODE';
var ALLOWED_TYPES = [exports.CODE];
var defaultGetComponent = function (_a) {
    var type = _a.type, object = _a.object;
    if (type !== exports.CODE) {
        return null;
    }
    if (object === 'mark') {
        return function (props) { return (React.createElement("code", __assign({ className: "ory-plugins-content-slate-code" }, props))); };
    }
    return node_1.default;
};
var CodePlugin = /** @class */ (function (_super) {
    __extends(CodePlugin, _super);
    function CodePlugin(props) {
        if (props === void 0) { props = {}; }
        var _this = _super.call(this) || this;
        _this.name = 'code';
        _this.createButton = function (type, icon) { return function (_a) {
            var editorState = _a.editorState, editor = _a.editor;
            var onClick = function (e) {
                e.preventDefault();
                editor.toggleMark(type);
            };
            var isActive = editorState && editorState.marks.some(function (mark) { return mark.type === type; });
            return React.createElement(helpers_1.ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
        }; };
        _this.createNodeButton = function (type, icon) { return function (_a) {
            var editorState = _a.editorState, editor = _a.editor;
            var onClick = function (e) {
                e.preventDefault();
                var _isActive = editorState.blocks.some(function (block) { return block.type === type; });
                editor.setBlocks(_isActive ? _this.DEFAULT_NODE : type);
            };
            var isActive = editorState.blocks.some(function (block) { return block.type === type; });
            return React.createElement(helpers_1.ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
        }; };
        _this.deserialize = function (el, next) {
            switch (el.tagName.toLowerCase()) {
                case 'code':
                    return {
                        object: 'mark',
                        type: exports.CODE,
                        data: slate_1.Data.create({}),
                        nodes: next(el.childNodes),
                    };
                case 'pre':
                    return {
                        object: 'block',
                        type: exports.CODE,
                        nodes: next(el.childNodes),
                    };
                default:
                    return;
            }
        };
        _this.serialize = function (
        // tslint:disable-next-line:no-any
        object, 
        // tslint:disable-next-line:no-any
        children) {
            var Component = _this.getComponent({
                type: object.type,
                object: object.object,
            });
            if (Component) {
                return React.createElement(Component, { children: children });
            }
            return;
        };
        _this.renderMark = function (props, editor, next) {
            var Component = _this.getComponent({
                type: props.mark.type,
                object: 'mark',
            });
            if (Component) {
                return React.createElement(Component, __assign({}, props));
            }
            return next();
        };
        _this.renderNode = function (props, editor, next) {
            if (!ALLOWED_TYPES.includes(props.node.type)) {
                return next();
            }
            var Component = _this.getComponent({
                type: props.node.type,
                object: 'block',
                data: props.node.data,
            });
            if (Component) {
                return React.createElement(Component, __assign({}, props));
            }
            return next();
        };
        _this.getComponent = props.getComponent || defaultGetComponent;
        _this.hoverButtons = [_this.createButton(exports.CODE, React.createElement(Code_1.default, null))];
        _this.toolbarButtons = [_this.createNodeButton(exports.CODE, React.createElement(Code_1.default, null))];
        _this.DEFAULT_NODE = props.DEFAULT_NODE || DEFAULT_NODE_1.default;
        return _this;
    }
    return CodePlugin;
}(Plugin_1.default));
exports.default = CodePlugin;
//# sourceMappingURL=index.js.map