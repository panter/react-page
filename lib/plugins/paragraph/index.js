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
var _a;
var React = __importStar(require("react"));
var Plugin_1 = __importDefault(require("../Plugin"));
exports.P = 'PARAGRAPH/PARAGRAPH';
var DEFAULT_MAPPING = (_a = {},
    _a[exports.P] = 'p',
    _a);
var ALLOWED_TYPES = [exports.P];
// tslint:disable-next-line:no-any
var defaultGetComponent = function (_a) {
    var type = _a.type;
    return DEFAULT_MAPPING[type];
};
var ParagraphPlugin = /** @class */ (function (_super) {
    __extends(ParagraphPlugin, _super);
    function ParagraphPlugin(props) {
        if (props === void 0) { props = {}; }
        var _this = _super.call(this) || this;
        _this.name = 'paragraph';
        /*schema = {
          nodes: { [P]: Paragraph },
        };*/
        // tslint:disable-next-line:no-any
        _this.deserialize = function (el, next) {
            switch (el.tagName.toLowerCase()) {
                case 'p':
                    return {
                        object: 'block',
                        type: exports.P,
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
            if (object.object !== 'block') {
                return;
            }
            if (!ALLOWED_TYPES.includes(object.type)) {
                return;
            }
            var Component = _this.getComponent({
                type: object.type,
                object: 'block',
                data: object.data,
            });
            if (Component) {
                return (React.createElement(Component, { style: { textAlign: object.data.get('align') } }, children));
            }
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
                return (React.createElement(Component, { style: { textAlign: props.node.data.get('align') } }, props.children));
            }
            return next();
            //
        };
        _this.getComponent = props.getComponent || defaultGetComponent;
        return _this;
    }
    return ParagraphPlugin;
}(Plugin_1.default));
exports.default = ParagraphPlugin;
//# sourceMappingURL=index.js.map