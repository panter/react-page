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
var React = __importStar(require("react"));
var element_resize_event_1 = __importDefault(require("element-resize-event"));
var classnames_1 = __importDefault(require("classnames"));
var defaultGetWidth = function (element) { return element.clientWidth; };
var defaultGetHeight = function (element) { return element.clientHeight; };
var Dimensions = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.getHeight, getHeight = _c === void 0 ? defaultGetHeight : _c, _d = _b.getWidth, getWidth = _d === void 0 ? defaultGetWidth : _d, _e = _b.className, className = _e === void 0 ? null : _e, _f = _b.elementResize, elementResize = _f === void 0 ? false : _f;
    return function (ComposedComponent) {
        var Decorator = /** @class */ (function (_super) {
            __extends(Decorator, _super);
            function Decorator(props) {
                var _this = _super.call(this, props) || this;
                _this.updateDimensions = function () {
                    var container = _this.containerRef;
                    var containerWidth = getWidth(container);
                    var containerHeight = getHeight(container);
                    if (containerWidth !== _this.state.containerWidth ||
                        containerHeight !== _this.state.containerHeight) {
                        _this.setState({ containerWidth: containerWidth, containerHeight: containerHeight });
                    }
                };
                _this.onResize = function () {
                    if (_this.rqf) {
                        return;
                    }
                    _this.rqf = _this.getWindow().requestAnimationFrame(function () {
                        _this.rqf = null;
                        _this.updateDimensions();
                    });
                };
                _this.onContainerRef = function (ref) {
                    _this.containerRef = ref;
                };
                _this.state = {};
                return _this;
            }
            Decorator.prototype.componentDidMount = function () {
                if (!this.containerRef) {
                    throw new Error('Cannot find container div');
                }
                this.updateDimensions();
                if (elementResize) {
                    // Experimental: `element-resize-event` fires when an element resizes.
                    // It attaches its own window resize listener and also uses
                    // requestAnimationFrame, so we can just call `this.updateDimensions`.
                    element_resize_event_1.default(this.containerRef, this.updateDimensions);
                }
                else {
                    this.getWindow().addEventListener('resize', this.onResize, false);
                }
            };
            // This cann not be used here because it doesn't listen to state changes.
            // shouldComponentUpdate = shouldPureComponentUpdate
            Decorator.prototype.componentWillUnmount = function () {
                this.getWindow().removeEventListener('resize', this.onResize);
            };
            // If the component is mounted in a different window to the javascript
            // context, as with https://github.com/JakeGinnivan/react-popout
            // then the `window` global will be different from the `window` that
            // contains the component.
            // Depends on `defaultView` which is not supported <IE9
            Decorator.prototype.getWindow = function () {
                return this.containerRef
                    ? this.containerRef.ownerDocument.defaultView || window
                    : window;
            };
            Decorator.prototype.render = function () {
                return (React.createElement("div", { className: classnames_1.default(className, 'ory-dimensions'), ref: this.onContainerRef },
                    React.createElement(ComposedComponent, __assign({}, this.state, this.props, { updateDimensions: this.updateDimensions }))));
            };
            return Decorator;
        }(React.Component));
        return function (props) { return React.createElement(Decorator, __assign({}, props)); };
    };
};
exports.default = Dimensions;
//# sourceMappingURL=index.js.map