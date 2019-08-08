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
Object.defineProperty(exports, "__esModule", { value: true });
exports.source = {
    beginDrag: function (props) {
        // Begin dragging the cell
        props.dragCell(props.id);
        return __assign({}, props, { 
            // we do not want to pass down the react children or we will risk circular dependencies.
            children: null, node: __assign({}, props.node, { rows: props.rawNode().rows }) });
    },
    endDrag: function (_a, monitor) {
        var cancelCellDrag = _a.cancelCellDrag, id = _a.id;
        if (monitor.didDrop()) {
            // If the item drop occurred deeper down the tree, don't do anything
            return;
        }
        // If drag ended but drop did not occur, cancel dragging
        cancelCellDrag();
    },
};
exports.collect = function (connect, monitor) { return ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
}); };
//# sourceMappingURL=dnd.js.map