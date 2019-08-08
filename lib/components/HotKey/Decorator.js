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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var reselect_1 = require("reselect");
var pathOr_1 = __importDefault(require("ramda/src/pathOr"));
var mousetrap_1 = __importDefault(require("mousetrap"));
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
if (mousetrap_1.default && mousetrap_1.default.prototype) {
    mousetrap_1.default.prototype.stopCallback = function () { return false; };
}
var wasInitialized = false;
var Decorator = /** @class */ (function (_super) {
    __extends(Decorator, _super);
    function Decorator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handlers = {
            undo: function () {
                var id = _this.props.id;
                _this.props.undo(id);
            },
            redo: function () {
                var id = _this.props.id;
                _this.props.redo(id);
            },
            // remove cells
            remove: function (e) {
                if (!_this.props.isEditMode) {
                    return;
                }
                var maybeNode = _this.props.searchNodeEverywhere(_this.props.focus);
                if (!maybeNode) {
                    return;
                }
                var n = maybeNode.node;
                hotKeyHandler(n, 'handleRemoveHotKey')(e, n)
                    .then(function () { return _this.props.removeCell(_this.props.focus); })
                    .catch(falser);
            },
            // focus next cell
            focusNext: function (e) {
                if (!_this.props.isEditMode) {
                    return;
                }
                var maybeNode = _this.props.searchNodeEverywhere(_this.props.focus);
                if (!maybeNode) {
                    return;
                }
                var n = maybeNode.node;
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
                var maybeNode = _this.props.searchNodeEverywhere(_this.props.focus);
                if (!maybeNode) {
                    return;
                }
                var n = maybeNode.node;
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
        return _this;
    }
    Decorator.prototype.componentDidMount = function () {
        if (!wasInitialized) {
            if (!mousetrap_1.default) {
                return;
            }
            mousetrap_1.default.bind(['ctrl+z', 'command+z'], this.handlers.undo);
            mousetrap_1.default.bind(['ctrl+shift+z', 'ctrl+y', 'command+shift+z', 'command+y'], this.handlers.redo);
            mousetrap_1.default.bind(['del', 'backspace'], this.handlers.remove);
            mousetrap_1.default.bind(['down', 'right'], this.handlers.focusNext);
            mousetrap_1.default.bind(['up', 'left'], this.handlers.focusPrev);
            wasInitialized = true;
        }
    };
    Decorator.prototype.render = function () {
        var children = this.props.children;
        return children;
    };
    return Decorator;
}(react_1.Component));
var mapStateToProps = reselect_1.createStructuredSelector({
    isEditMode: display_1.isEditMode,
    focus: focus_1.focus,
    // tslint:disable-next-line:no-any
    node: function (state) { return function (id, _editable) {
        return editable_1.node(state, { id: id, editable: _editable });
    }; },
    searchNodeEverywhere: function (state) { return function (id) {
        return editable_1.searchNodeEverywhere(state, id);
    }; },
    // tslint:disable-next-line:no-any
    editable: function (state, props) { return function (id) {
        return editable_1.editable(state, id ? { id: id } : props);
    }; },
    editables: editable_1.editables,
});
var mapDispatchToProps = {
    undo: undo_1.undo,
    redo: undo_1.redo,
    removeCell: cell_1.removeCell,
    focusCell: function (id) { return cell_1.focusCell(id)(); },
    blurAllCells: cell_1.blurAllCells,
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Decorator);
//# sourceMappingURL=Decorator.js.map