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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
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
var classnames_1 = __importDefault(require("classnames"));
var redux_1 = require("redux");
var reselect_1 = require("reselect");
var Inner_1 = __importDefault(require("./Inner"));
var editable_1 = require("../../selector/editable");
var display_1 = require("../../selector/display");
var cell_1 = require("../../actions/cell");
var Resizable_1 = __importDefault(require("./Resizable"));
var gridClass = function (_a) {
    var size = _a.node.size, rest = __rest(_a, ["node"]);
    if (rest.isPreviewMode || rest.isEditMode) {
        return "ory-cell-" + (rest.isPreviewMode || rest.isEditMode ? 'sm' : 'xs') + "-" + (size || 12) + " ory-cell-xs-12";
    }
    return "ory-cell-xs-" + (size || 12);
};
var stopClick = function (_isEditMode) { return function (e) { return (_isEditMode ? e.stopPropagation() : null); }; };
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cell.prototype.render = function () {
        var _a;
        var _b = this.props, id = _b.id, rowWidth = _b.rowWidth, rowHeight = _b.rowHeight, updateDimensions = _b.updateDimensions, _c = _b.node, inline = _c.inline, resizable = _c.resizable, hasInlineNeighbour = _c.hasInlineNeighbour, focused = _c.focused;
        return (React.createElement("div", { className: classnames_1.default('ory-cell', gridClass(this.props), (_a = {
                    'ory-cell-has-inline-neighbour': hasInlineNeighbour
                },
                _a["ory-cell-inline-" + (inline || '')] = inline,
                _a['ory-cell-focused'] = focused,
                _a['ory-cell-resizing-overlay'] = this.props.isResizeMode,
                _a['ory-cell-bring-to-front'] = !this.props.isResizeMode && !this.props.isLayoutMode && inline,
                _a)), onClick: stopClick(this.props.isEditMode) }, resizable && this.props.isResizeMode ? (React.createElement(Resizable_1.default, __assign({}, this.props, { id: id, rowWidth: rowWidth, rowHeight: rowHeight, updateDimensions: updateDimensions, node: this.props.node, steps: 12, onChange: this.props.resizeCell }),
            React.createElement(Inner_1.default, __assign({}, this.props, { styles: null })))) : (React.createElement(Inner_1.default, __assign({}, this.props, { styles: null })))));
    };
    return Cell;
}(React.PureComponent));
var mapStateToProps = reselect_1.createStructuredSelector({
    isPreviewMode: display_1.isPreviewMode,
    isEditMode: display_1.isEditMode,
    isResizeMode: display_1.isResizeMode,
    // required by sub-components
    isInsertMode: display_1.isInsertMode,
    isLayoutMode: display_1.isLayoutMode,
    config: editable_1.editableConfig,
    node: editable_1.purifiedNode,
    rawNode: function (state, props) { return function () { return editable_1.node(state, props); }; },
});
var mapDispatchToProps = function (dispatch, _a) {
    var id = _a.id;
    return redux_1.bindActionCreators({
        resizeCell: cell_1.resizeCell(id),
        focusCell: cell_1.focusCell(id),
        blurAllCells: cell_1.blurAllCells,
    }, dispatch);
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Cell);
//# sourceMappingURL=index.js.map