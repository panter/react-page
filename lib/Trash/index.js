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
var react_dnd_1 = require("react-dnd");
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var Fab_1 = __importDefault(require("@material-ui/core/Fab"));
var react_redux_1 = require("react-redux");
var classnames_1 = __importDefault(require("classnames"));
var core_1 = require("@react-page/core/lib/actions/cell/core");
var lodash_throttle_1 = __importDefault(require("lodash.throttle"));
var display_1 = require("@react-page/core/lib/selector/display");
var reselect_1 = require("reselect");
var index_1 = __importDefault(require("../Provider/index"));
var target = {
    hover: lodash_throttle_1.default(
    // tslint:disable-next-line:no-any
    function (props, monitor) {
        var item = monitor.getItem();
        if (monitor.isOver({ shallow: true })) {
            item.clearHover();
        }
    }, 200, { trailing: false }),
    // tslint:disable-next-line:no-any
    drop: function (props, monitor) {
        var item = monitor.getItem();
        if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
            // If the item drop occurred deeper down the tree, don't do anything
            return;
        }
        props.removeCell(item.id);
    },
};
// tslint:disable-next-line:no-any
var connectMonitor = function (_connect, monitor) { return ({
    connectDropTarget: _connect.dropTarget(),
    isOverCurrent: monitor.isOver({ shallow: true }),
}); };
var Raw = /** @class */ (function (_super) {
    __extends(Raw, _super);
    function Raw() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Raw.prototype.render = function () {
        var _a = this.props, connectDropTarget = _a.connectDropTarget, isOverCurrent = _a.isOverCurrent;
        return connectDropTarget(React.createElement("div", { className: classnames_1.default('ory-controls-trash', {
                'ory-controls-trash-active': this.props.isLayoutMode,
            }) },
            React.createElement(Fab_1.default, { color: "secondary", disabled: !isOverCurrent },
                React.createElement(Delete_1.default, null))));
    };
    return Raw;
}(React.Component));
var types = function (_a) {
    var editor = _a.editor;
    var plugins = Object.keys(editor.plugins.plugins.layout).concat(Object.keys(editor.plugins.plugins.content)).map(function (p) {
        return editor.plugins.plugins.content[p].name ||
            editor.plugins.plugins.layout[p].name;
    });
    if (editor.plugins.hasNativePlugin()) {
        plugins.push(editor.plugins.getNativePlugin()().name);
    }
    return plugins;
};
var mapDispatchToProps = {
    removeCell: core_1.removeCell,
};
var mapStateToProps = reselect_1.createStructuredSelector({
    isEditMode: display_1.isEditMode,
    isLayoutMode: display_1.isLayoutMode,
    isPreviewMode: display_1.isPreviewMode,
    isInsertMode: display_1.isInsertMode,
    isResizeMode: display_1.isResizeMode,
});
var Decorated = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(react_dnd_1.DropTarget(types, target, connectMonitor)(Raw));
var Trash = function (props) { return (React.createElement(index_1.default, __assign({}, props),
    React.createElement(Decorated, __assign({}, props)))); };
exports.default = Trash;
//# sourceMappingURL=index.js.map