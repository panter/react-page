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
var reselect_1 = require("reselect");
var classes_1 = require("../../../service/plugin/classes");
var Cell_1 = __importDefault(require("../../Cell"));
var editable_1 = require("../../../selector/editable");
var Dimensions_1 = __importDefault(require("../../Dimensions"));
var cell_1 = require("../../../actions/cell");
var blur_1 = require("./blur");
var Inner = /** @class */ (function (_super) {
    __extends(Inner, _super);
    function Inner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createFallbackCell = function () {
            var _a = _this.props, node = _a.node, defaultPlugin = _a.defaultPlugin, id = _a.id;
            if (!node) {
                return;
            }
            var _b = node.cells, cells = _b === void 0 ? [] : _b;
            if (cells.length === 0) {
                _this.props.createFallbackCell(new classes_1.ContentPlugin(defaultPlugin), id);
            }
        };
        return _this;
    }
    Inner.prototype.componentDidMount = function () {
        blur_1.enableGlobalBlurring(this.props.blurAllCells);
        this.createFallbackCell();
    };
    Inner.prototype.componentDidUpdate = function () {
        this.createFallbackCell();
    };
    Inner.prototype.componentWillUnmount = function () {
        blur_1.disableGlobalBlurring(this.props.blurAllCells);
    };
    Inner.prototype.render = function () {
        var _a = this.props, id = _a.id, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight, node = _a.node;
        if (!node) {
            return null;
        }
        var _b = node.cells, cells = _b === void 0 ? [] : _b;
        return (React.createElement("div", { className: "ory-editable ory-prevent-blur" }, cells.map(function (c) { return (React.createElement(Cell_1.default, { rowWidth: containerWidth, rowHeight: containerHeight, editable: id, ancestors: [], key: c, id: c })); })));
    };
    return Inner;
}(React.PureComponent));
var mapStateToProps = reselect_1.createStructuredSelector({ node: editable_1.purifiedEditable });
var mapDispatchToProps = { blurAllCells: cell_1.blurAllCells, createFallbackCell: cell_1.createFallbackCell };
exports.default = Dimensions_1.default()(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Inner));
//# sourceMappingURL=index.js.map