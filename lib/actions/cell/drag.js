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
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("../../const");
exports.CELL_DRAG_HOVER = 'CELL_DRAG_HOVER';
exports.CELL_DRAG = 'CELL_DRAG';
exports.CELL_DRAG_CANCEL = 'CELL_DRAG_CANCEL';
exports.CLEAR_CLEAR_HOVER = 'CLEAR_CLEAR_HOVER';
/**
 * Creates a redux action for when a cell hovers another item.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHover(drag, hover, level, position))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @param {string} position Can be left, right, above, below.
 * @return {Action}
 */
exports.cellHover = function (_a, _b, level, position) {
    var drag = _a.id;
    var hover = _b.id;
    if (level === void 0) { level = 0; }
    return ({
        type: exports.CELL_DRAG_HOVER,
        ts: new Date(),
        drag: drag,
        hover: hover,
        level: level,
        position: position,
    });
};
/**
 * Creates a redux action for when a cell is hovering another cell on the left.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverLeftOf(drag, hover, level))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
exports.cellHoverLeftOf = function (drag, hover, level) { return exports.cellHover(drag, hover, level, const_1.PositionEnum.LEFT_OF); };
/**
 * Creates a redux action for when a cell is hovering another cell on the right.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverRightOf(drag, hover, level))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
exports.cellHoverRightOf = function (drag, hover, level) { return exports.cellHover(drag, hover, level, const_1.PositionEnum.RIGHT_OF); };
/**
 * Creates a redux action for when a cell is hovering another cell above.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverAbove(drag, hover, level))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
exports.cellHoverAbove = function (drag, hover, level) {
    return exports.cellHover(drag, hover, level, const_1.PositionEnum.ABOVE);
};
/**
 * Creates a redux action for when a cell is hovering another cell below.
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverBelow(drag, hover, level))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @param {number} level Set the level if the dragged cells should hover over an ancestor of hover.
 * @return {Action}
 */
exports.cellHoverBelow = function (drag, hover, level) {
    return exports.cellHover(drag, hover, level, const_1.PositionEnum.BELOW);
};
/**
 * Creates a redux action for when a cell is hovering another cell on the left, but inline (css floating).
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverInlineLeft(drag, hover))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @return {Action}
 */
exports.cellHoverInlineLeft = function (drag, hover) {
    return exports.cellHover(drag, hover, 0, const_1.PositionEnum.INLINE_LEFT);
};
/**
 * Creates a redux action for when a cell is hovering another cell on the right, but inline (css floating).
 *
 * @example
 * // const store = redux.createStore()
 * store.dispatch(cellHoverInlineRight(drag, hover))
 *
 * @param {Cell} drag The cell that is currently being dragged.
 * @param {Cell} hover The cell that is being hovered by the dragged cell.
 * @return {Action}
 */
exports.cellHoverInlineRight = function (drag, hover) {
    return exports.cellHover(drag, hover, 0, const_1.PositionEnum.INLINE_RIGHT);
};
/**
 * Creates a redux action for when a cell is being dragged.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(dragCell(cell.id))
 *
 * @param {string} id The id of the cell that is being dragged.
 * @return {Action}
 */
exports.dragCell = function (id) { return ({
    type: exports.CELL_DRAG,
    ts: new Date(),
    id: id,
}); };
/**
 * Creates a redux action to clear hover state of all cells.
 *
 * @return {Action}
 */
exports.clearHover = function () { return ({
    type: exports.CLEAR_CLEAR_HOVER,
    ts: new Date(),
}); };
/**
 * Creates a redux action for when cell dragging ends.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(cancelCellDrag(cell.id))
 *
 * @param {string} id
 * @return {Action}
 */
exports.cancelCellDrag = function () { return ({
    type: exports.CELL_DRAG_CANCEL,
    ts: new Date(),
}); };
exports.dragActions = {
    cancelCellDrag: exports.cancelCellDrag,
    clearHover: exports.clearHover,
    dragCell: exports.dragCell,
    cellHoverInlineRight: exports.cellHoverInlineRight,
    cellHoverInlineLeft: exports.cellHoverInlineLeft,
    cellHoverBelow: exports.cellHoverBelow,
    cellHoverAbove: exports.cellHoverAbove,
    cellHoverRightOf: exports.cellHoverRightOf,
    cellHoverLeftOf: exports.cellHoverLeftOf,
    cellHover: exports.cellHover,
};
//# sourceMappingURL=drag.js.map