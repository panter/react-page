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
var react_redux_1 = require("react-redux");
var DragDropContext_1 = __importDefault(require("../DragDropContext"));
var Decorator_1 = __importDefault(require("../HotKey/Decorator"));
var editable_1 = require("../../selector/editable");
var Inner_1 = __importDefault(require("./Inner"));
var Editable = /** @class */ (function (_super) {
    __extends(Editable, _super);
    function Editable(props) {
        var _this = _super.call(this, props) || this;
        _this.previousState = {};
        _this.onChange = function () {
            var onChange = _this.props.onChange;
            if (typeof onChange !== 'function') {
                return;
            }
            var state = editable_1.editable(_this.props.editor.store.getState(), {
                id: _this.props.id,
            });
            if (state === _this.previousState || !state) {
                return;
            }
            var serialized = _this.props.editor.plugins.serialize(state);
            onChange(serialized);
        };
        _this.DragDropContext = DragDropContext_1.default(props.editor.dragDropContext);
        return _this;
    }
    Editable.prototype.componentDidMount = function () {
        if (!this.props.id) {
            throw new Error('The state must have an unique id');
        }
        this.unsubscribe = this.props.editor.store.subscribe(this.onChange);
        this.previousState = null;
    };
    Editable.prototype.componentWillUnmount = function () {
        this.unsubscribe();
    };
    Editable.prototype.render = function () {
        var _a = this.props, id = _a.id, _b = _a.editor, store = _b.store, defaultPlugin = _b.defaultPlugin;
        var DragDropContext = this.DragDropContext;
        return (React.createElement(react_redux_1.Provider, { store: store },
            React.createElement(DragDropContext, null,
                React.createElement(Decorator_1.default, { id: id },
                    React.createElement(Inner_1.default, { id: id, defaultPlugin: defaultPlugin })))));
    };
    return Editable;
}(React.PureComponent));
exports.default = Editable;
//# sourceMappingURL=index.js.map