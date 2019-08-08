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
var React = __importStar(require("react"));
var react_resizable_1 = require("react-resizable");
var react_redux_1 = require("react-redux");
var classnames_1 = __importDefault(require("classnames"));
var reselect_1 = require("reselect");
var display_1 = require("../../../actions/display");
var helper_1 = require("./helper");
var Resizable = /** @class */ (function (_super) {
    __extends(Resizable, _super);
    function Resizable(props) {
        var _this = _super.call(this, props) || this;
        _this.onResize = function (event, _a) {
            var size = _a.size;
            var newSize = helper_1.widthToSize(_this.state, _this.props, size);
            if (!newSize) {
                console.warn('Expected resize event to yield a valid size, but got', {
                    newSize: newSize,
                    size: size,
                    props: _this.props,
                    state: _this.state,
                });
                return;
            }
            _this.props.onChange(newSize);
            _this.setState({ width: newSize * _this.state.stepWidth });
        };
        var sw = helper_1.computeStepWidth(props);
        _this.state = {
            stepWidth: sw,
            width: props.node.size * sw,
            steps: props.steps - 1 || 11,
        };
        return _this;
    }
    Resizable.prototype.render = function () {
        var _a;
        var _b = this.props, _c = _b.node, bounds = _c.bounds, inline = _c.inline, children = _b.children;
        return (React.createElement(react_resizable_1.Resizable, { className: classnames_1.default('ory-cell-inner', 'ory-cell-resizable', (_a = {},
                _a["ory-cell-resizable-inline-" + (inline || '')] = inline,
                _a)), onResize: this.onResize, minConstraints: inline ? null : [this.state.stepWidth, Infinity], maxConstraints: inline ? null : [bounds.right * this.state.stepWidth, Infinity], draggableOpts: { axis: 'none', offsetParent: document.body }, width: this.state.width, height: 0 },
            React.createElement("div", null, children)));
    };
    return Resizable;
}(React.PureComponent));
var mapStateToProps = reselect_1.createStructuredSelector({});
var mapDispatchToProps = { resizeMode: display_1.resizeMode, editMode: display_1.editMode };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Resizable);
//# sourceMappingURL=index.js.map