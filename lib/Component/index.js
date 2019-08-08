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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (e) {
            var target = e.target;
            if (target instanceof HTMLInputElement) {
                var change = {};
                if (target.name === 'target') {
                    if (target.checked) {
                        change.target = '_blank';
                        // noopener is safer but not supported in IE, so noreferrer adds some security
                        change.rel = 'noreferrer noopener';
                    }
                    else {
                        change.target = null;
                        change.rel = null;
                    }
                }
                else {
                    change[target.name] = target.value;
                }
                _this.props.onChange(change);
                return;
            }
        };
        _this.handleImageLoaded = function (image) {
            return _this.setState({ imagePreview: image });
        };
        _this.handleImageUploaded = function (resp) {
            _this.setState({ imagePreview: undefined });
            _this.props.onChange({ src: resp.url });
        };
        _this.state = {};
        return _this;
    }
    Form.prototype.render = function () {
        var _a = this.props, Controls = _a.Controls, Renderer = _a.Renderer, readOnly = _a.readOnly;
        return (React.createElement(React.Fragment, null,
            React.createElement(Renderer, __assign({}, this.props)),
            !readOnly ? (React.createElement(Controls, __assign({}, this.props, { imagePreview: this.state.imagePreview, handleImageLoaded: this.handleImageLoaded, handleImageUploaded: this.handleImageUploaded, handleChange: this.handleChange }))) : null));
    };
    return Form;
}(React.Component));
exports.default = Form;
//# sourceMappingURL=index.js.map