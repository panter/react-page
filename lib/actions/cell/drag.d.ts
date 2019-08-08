import { PositionEnum } from '../../const';
import { Action } from 'redux';
export declare const CELL_DRAG_HOVER = "CELL_DRAG_HOVER";
export declare const CELL_DRAG = "CELL_DRAG";
export declare const CELL_DRAG_CANCEL = "CELL_DRAG_CANCEL";
export declare const CLEAR_CLEAR_HOVER = "CLEAR_CLEAR_HOVER";
export interface CellHoverAction extends Action {
    ts: Date;
    drag: string;
    hover: string;
    level: number;
    position: PositionEnum;
}
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
export declare const cellHover: ({ id: drag }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level: number, position: PositionEnum) => CellHoverAction;
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
export declare const cellHoverLeftOf: (drag: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, hover: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level: number) => CellHoverAction;
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
export declare const cellHoverRightOf: (drag: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, hover: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level: number) => CellHoverAction;
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
export declare const cellHoverAbove: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, level: number) => CellHoverAction;
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
export declare const cellHoverBelow: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, level: number) => CellHoverAction;
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
export declare const cellHoverInlineLeft: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>) => CellHoverAction;
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
export declare const cellHoverInlineRight: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>) => CellHoverAction;
export interface DragCellAction extends Action {
    ts: Date;
    id: string;
}
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
export declare const dragCell: (id: string) => DragCellAction;
export interface ClearHoverAction extends Action {
    ts: Date;
}
/**
 * Creates a redux action to clear hover state of all cells.
 *
 * @return {Action}
 */
export declare const clearHover: () => ClearHoverAction;
export interface CancelCellDragAction extends Action {
    ts: Date;
}
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
export declare const cancelCellDrag: () => CancelCellDragAction;
export declare const dragActions: {
    cancelCellDrag: () => CancelCellDragAction;
    clearHover: () => ClearHoverAction;
    dragCell: (id: string) => DragCellAction;
    cellHoverInlineRight: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>) => CellHoverAction;
    cellHoverInlineLeft: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>) => CellHoverAction;
    cellHoverBelow: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, level: number) => CellHoverAction;
    cellHoverAbove: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, level: number) => CellHoverAction;
    cellHoverRightOf: (drag: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, hover: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level: number) => CellHoverAction;
    cellHoverLeftOf: (drag: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, hover: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level: number) => CellHoverAction;
    cellHover: ({ id: drag }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level: number, position: PositionEnum) => CellHoverAction;
};
//# sourceMappingURL=drag.d.ts.map