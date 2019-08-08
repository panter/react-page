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
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var reselect_1 = require("reselect");
var cell_1 = require("../../../actions/cell");
var display_1 = require("../../../selector/display");
// TODO clean me up #157
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onRef = function (ref) {
            _this.ref = ref;
        };
        return _this;
    }
    Content.prototype.componentWillReceiveProps = function (nextProps) {
        var was = this.props.node.focused;
        var _a = nextProps.node, is = _a.focused, focusSource = _a.focusSource;
        var editable = nextProps.editable, id = nextProps.id, _b = nextProps.node, _c = _b.content, _d = _c === void 0 ? {} : _c, _e = _d.plugin, _f = _e === void 0 ? {} : _e, _g = _f.handleFocus, handleFocus = _g === void 0 ? function () { return null; } : _g, _h = _f.handleBlur, handleBlur = _h === void 0 ? function () { return null; } : _h, _j = _f.name, name = _j === void 0 ? 'N/A' : _j, _k = _f.version, version = _k === void 0 ? 'N/A' : _k, _l = _d.state, state = _l === void 0 ? {} : _l, focused = _b.focused;
        // FIXME this is really shitty because it will break when the state changes before the blur comes through, see #157
        // tslint:disable-next-line:no-any
        var pass = {
            editable: editable,
            id: id,
            state: state,
            focused: this.props.isEditMode && focused,
            readOnly: !display_1.isEditMode,
            onChange: this.props.updateCellContent,
            name: name,
            version: version,
            isEditMode: nextProps.isEditMode,
            isResizeMode: nextProps.isResizeMode,
            isPreviewMode: nextProps.isPreviewMode,
            isInsertMode: nextProps.isInsertMode,
            isLayoutMode: nextProps.isLayoutMode,
        };
        // Basically we check if the focus state changed and if yes, we execute the callback handler from the plugin, that
        // can set some side effects.
        if (!was && is) {
            // We need this because otherwise we lose hotkey focus on elements like spoilers.
            // This could probably be solved in an easier way by listening to window.document?
            handleFocus(pass, focusSource, this.ref);
        }
        else if (was && !is) {
            handleBlur(pass);
        }
    };
    Content.prototype.render = function () {
        var _a = this.props, editable = _a.editable, id = _a.id, _b = _a.node, _c = _b.content, _d = _c === void 0 ? {} : _c, _e = _d.plugin, _f = _e === void 0 ? {} : _e, _g = _f.Component, Component = _g === void 0 ? function () { return null; } : _g, _h = _f.name, name = _h === void 0 ? 'N/A' : _h, _j = _f.version, version = _j === void 0 ? 'N/A' : _j, _k = _d.state, state = _k === void 0 ? {} : _k, focused = _b.focused;
        var _l = this.props, focusCell = _l.focusCell, blurCell = _l.blurCell;
        var focusProps;
        if (!this.props.isPreviewMode) {
            focusProps = {
                onMouseDown: function () {
                    if (!focused) {
                        focusCell({ source: 'onMouseDown' });
                    }
                    return true;
                },
            };
        }
        return (React.createElement("div", __assign({}, focusProps, { tabIndex: "-1", style: { outline: 'none' }, ref: this.onRef, className: "ory-cell-inner ory-cell-leaf" }),
            React.createElement(Component, { editable: editable, id: id, state: state, focused: this.props.isEditMode && focused, name: name, version: version, readOnly: !this.props.isEditMode, onChange: this.props.updateCellContent, focus: focusCell, blur: blurCell, isInsertMode: this.props.isInsertMode, isResizeMode: this.props.isResizeMode, isPreviewMode: this.props.isPreviewMode, isEditMode: this.props.isEditMode, isLayoutMode: this.props.isLayoutMode })));
    };
    return Content;
}(React.PureComponent));
var mapStateToProps = reselect_1.createStructuredSelector({
    isEditMode: display_1.isEditMode,
    isLayoutMode: display_1.isLayoutMode,
    isPreviewMode: display_1.isPreviewMode,
    isInsertMode: display_1.isInsertMode,
    isResizeMode: display_1.isResizeMode,
});
var mapDispatchToProps = function (dispatch, _a) {
    var id = _a.id;
    return redux_1.bindActionCreators({
        updateCellContent: cell_1.updateCellContent(id),
    }, dispatch);
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Content);
//# sourceMappingURL=index.js.map