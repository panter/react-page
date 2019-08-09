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
var _a;
/* eslint-disable no-alert, prefer-reflect, default-case, react/display-name */
var React = __importStar(require("react"));
var Plugin_1 = __importDefault(require("../Plugin"));
var slate_1 = require("slate");
var core_1 = require("@react-page/core");
var LinkButton = core_1.lazyLoad(function () { return Promise.resolve().then(function () { return __importStar(require('./LinkButton')); }); });
exports.A = 'LINK/LINK';
var ALLOWED_TYPES = [exports.A];
var DEFAULT_MAPPING = (_a = {},
    _a[exports.A] = 'a',
    _a);
// tslint:disable-next-line:no-any
var defaultGetComponent = function (_a) {
    var type = _a.type;
    return DEFAULT_MAPPING[type];
};
var LinkPlugin = /** @class */ (function (_super) {
    __extends(LinkPlugin, _super);
    function LinkPlugin(props) {
        if (props === void 0) { props = {}; }
        var _this = _super.call(this) || this;
        _this.name = 'link';
        /*schema = {
          nodes: { [A]: Link },
        };*/
        _this.hoverButtons = [LinkButton];
        _this.toolbarButtons = [LinkButton];
        _this.deserialize = function (el, next) {
            switch (el.tagName.toLowerCase()) {
                case 'a':
                    return {
                        object: 'inline',
                        type: exports.A,
                        nodes: next(el.childNodes),
                        data: slate_1.Data.create({
                            href: el.getAttribute('href') || '',
                        }),
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
            if (object.object !== 'inline') {
                return;
            }
            var Component = _this.getComponent({
                type: object.type,
                object: 'inline',
                data: object.data,
            });
            if (!Component) {
                return null;
            }
            return React.createElement(Component, { href: object.data.get('href') }, children);
        };
        _this.renderNode = function (props, editor, next) {
            if (!ALLOWED_TYPES.includes(props.node.type)) {
                return next();
            }
            var Component = _this.getComponent({
                type: props.node.type,
                object: 'inline',
                data: props.node.data,
            });
            if (Component) {
                return React.createElement(Component, __assign({}, props));
            }
            return next();
        };
        _this.getComponent = props.getComponent || defaultGetComponent;
        return _this;
    }
    return LinkPlugin;
}(Plugin_1.default));
exports.default = LinkPlugin;
//# sourceMappingURL=index.js.map