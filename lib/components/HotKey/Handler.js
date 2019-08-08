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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_hotkeys_1 = require("react-hotkeys");
var react_redux_1 = require("react-redux");
var pathOr_1 = __importDefault(require("ramda/src/pathOr"));
var reselect_1 = require("reselect");
var undo_1 = require("../../actions/undo");
var cell_1 = require("../../actions/cell");
var display_1 = require("../../selector/display");
var focus_1 = require("../../selector/focus");
var editable_1 = require("../../selector/editable");
var hotKeyHandler = function (n, key) {
    return pathOr_1.default(pathOr_1.default(function () { return Promise.resolve(); }, ['content', 'plugin', key], n), ['layout', 'plugin', key], n);
};
var nextLeaf = function (order, current) {
    if (order === void 0) { order = []; }
    var last;
    return order.find(function (c) {
        if (last === current) {
            return c.isLeaf;
        }
        last = c.id;
        return false;
    });
};
var previousLeaf = function (order, current) {
    return nextLeaf(order.slice().reverse(), current);
};
var falser = function (err) {
    if (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
    }
};
// TODO cleanup and tests #143
var handlers = function (props) {
    var id = props.id;
    return {
        undo: function () { return _this.props.undo(id); },
        redo: function () { return _this.props.redo(id); },
        // remove cells
        remove: function (e) {
            if (!_this.props.isEditMode) {
                return;
            }
            var n = _this.props.node(_this.props.focus, id);
            hotKeyHandler(n, 'handleRemoveHotKey')(e, n)
                .then(function () { return _this.props.removeCell(_this.props.focus); })
                .catch(falser);
        },
        // focus next cell
        focusNext: function (e) {
            if (!_this.props.isEditMode) {
                return;
            }
            var n = _this.props.node(_this.props.focus, id);
            hotKeyHandler(n, 'handleFocusNextHotKey')(e, n)
                .then(function () {
                var found = nextLeaf(_this.props.editable.cellOrder, _this.props.focus);
                if (found) {
                    _this.props.blurAllCells();
                    _this.props.focusCell(found.id);
                }
            })
                .catch(falser);
        },
        // focus previous cell
        focusPrev: function (e) {
            if (!_this.props.isEditMode) {
                return;
            }
            var n = _this.props.node(_this.props.focus, id);
            hotKeyHandler(n, 'handleFocusPreviousHotKey')(e, n)
                .then(function () {
                var found = previousLeaf(_this.props.editable.cellOrder, _this.props.focus);
                if (found) {
                    _this.props.blurAllCells();
                    _this.props.focusCell(found.id);
                }
            })
                .catch(falser);
        },
    };
};
var Decorator = function (props) { return (
// Rewrite: Check if this was necessary style={{ outline: 'none' }}
React.createElement(react_hotkeys_1.HotKeys, { handlers: handlers(props) }, props.children)); };
var mapStateToProps = reselect_1.createStructuredSelector({
    isEditMode: display_1.isEditMode,
    focus: focus_1.focus,
    // tslint:disable-next-line:no-any
    node: function (state) { return function (id, _editable) {
        return editable_1.node(state, { id: id, editable: _editable });
    }; },
    // tslint:disable-next-line:no-any
    editable: function (state, props) { return editable_1.editable(state, props); },
});
var mapDispatchToProps = {
    undo: undo_1.undo,
    redo: undo_1.redo,
    removeCell: cell_1.removeCell,
    focusCell: function (id) { return cell_1.focusCell(id)(); },
    blurAllCells: cell_1.blurAllCells,
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Decorator);
//# sourceMappingURL=Handler.js.map