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
var react_redux_1 = require("react-redux");
var reselect_1 = require("reselect");
var Droppable_1 = __importDefault(require("./Droppable"));
var inner_1 = __importDefault(require("./inner"));
var Dimensions_1 = __importDefault(require("../Dimensions"));
var display_1 = require("../../selector/display");
var editable_1 = require("../../selector/editable");
var cell_1 = require("../../actions/cell");
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row(props) {
        var _this = _super.call(this, props) || this;
        var whitelist = props.config.whitelist;
        _this.Droppable = Droppable_1.default(whitelist);
        return _this;
    }
    Row.prototype.render = function () {
        var Droppable = this.Droppable;
        var props = this.props;
        return (React.createElement(Droppable, __assign({}, props),
            React.createElement(inner_1.default, __assign({}, props))));
    };
    return Row;
}(React.PureComponent));
var mapStateToProps = reselect_1.createStructuredSelector({
    isLayoutMode: display_1.isLayoutMode,
    config: editable_1.editableConfig,
    isResizeMode: display_1.isResizeMode,
    isInsertMode: display_1.isInsertMode,
    isEditMode: display_1.isEditMode,
    node: editable_1.purifiedNode,
    rawNode: function (state, props) { return function () { return editable_1.node(state, props); }; },
});
var mapDispatchToProps = {
    blurAllCells: cell_1.blurAllCells,
};
exports.default = Dimensions_1.default()(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Row));
//# sourceMappingURL=index.js.map