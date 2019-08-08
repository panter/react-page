import { Action } from 'redux';
import { EditorState } from '../../types/editor';
export declare const CELL_UPDATE_CONTENT = "CELL_UPDATE_CONTENT";
export declare const CELL_UPDATE_LAYOUT = "CELL_UPDATE_LAYOUT";
export declare const CELL_REMOVE = "CELL_REMOVE";
export declare const CELL_RESIZE = "CELL_RESIZE";
export declare const CELL_FOCUS = "CELL_FOCUS";
export declare const CELL_BLUR = "CELL_BLUR";
export declare const CELL_BLUR_ALL = "CELL_BLUR_ALL";
export declare const CELL_FOCUS_PREV = "CELL_FOCUS_PREV";
export declare const CELL_FOCUS_NEXT = "CELL_FOCUS_NEXT";
export declare const CELL_CREATE_FALLBACK = "CELL_CREATE_FALLBACK";
export interface UpdateCellContentAction extends Action {
    ts: Date;
    id: string;
    state: EditorState;
}
/**
 * An action creator for updating a cell's content data.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(updateCellContent(cell.id, { foo: 'bar' }))
 *
 * @param {string} id The id of the cell that should be updated
 * @return {Action}
 */
export declare const updateCellContent: (id: string) => (state?: EditorState) => UpdateCellContentAction;
export interface UpdateCellLayoutAction extends Action {
    ts: Date;
    id: string;
    state: EditorState;
}
/**
 * An action creator for updating a cell's layout data.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(updateCellLayout(cell.id, { foo: 'bar' }))
 *
 * @param {string} id The id of the cell that should be updated
 * @return {Action}
 */
export declare const updateCellLayout: (id: string) => (state?: EditorState) => UpdateCellLayoutAction;
export interface RemoveCellAction extends Action {
    ts: Date;
    id: string;
    ids: string[];
}
/**
 * An action creator for removing a cell.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(removeCell(cell.id, ['1', '2', '3', '4', ...]))
 *
 * @param {string} id The id of the cell that should be removed.
 * @param {string} ids An array of IDs for new cells that might be created.
 * @return {Action}
 */
export declare const removeCell: (id: string, ids?: string[]) => RemoveCellAction;
export interface ResizeCellAction extends Action {
    ts: Date;
    id: string;
    size: number;
}
/**
 * An action creator for resizing a cell.
 *
 * @example
 * // const store = redux.createStore()
 * // const cell = { id: '1', ... }
 * store.dispatch(resizeCell(cell.id)(size))
 *
 * @param {string} id The id of the cell that should be removed.
 * @param {number} size The cell's new size.
 * @return {Function}
 */
export declare const resizeCell: (id: string) => (size?: number) => ResizeCellAction;
export interface FocusCellAction extends Action {
    ts: Date;
    id: string;
    source: string;
}
/**
 * Dispatch to focus a cell.
 */
export declare const focusCell: (id: string) => ({ source, }?: {
    source?: string;
}) => FocusCellAction;
export interface FocusNextCellAction extends Action {
    ts: Date;
    id: string;
}
/**
 * Dispatch to focus a cell.
 */
export declare const focusNextCell: (id: string) => () => FocusNextCellAction;
export interface FocusPreviousCellAction extends Action {
    ts: Date;
    id: string;
}
/**
 * Dispatch to focus a cell.
 */
export declare const focusPreviousCell: (id: string) => () => FocusPreviousCellAction;
export interface BlurCellAction extends Action {
    ts: Date;
    id: string;
}
/**
 * Dispatch to blur a cell.
 */
export declare const blurCell: (id: string) => () => BlurCellAction;
export interface BlurAllCellsAction extends Action {
    ts: Date;
}
/**
 * Dispatch to blur all cells. For example when clicking on document body.
 */
export declare const blurAllCells: () => BlurAllCellsAction;
export interface CreateFallbackCellAction extends Action {
    ts: Date;
    editable: string;
    ids: string[];
    fallback: any;
}
/**
 * Creates a fallback cell, usually done when an editable is empty.
 */
export declare const createFallbackCell: (fallback: any, editable: string) => CreateFallbackCellAction;
export declare const coreActions: {
    createFallbackCell: (fallback: any, editable: string) => CreateFallbackCellAction;
    blurAllCells: () => BlurAllCellsAction;
    blurCell: (id: string) => () => BlurCellAction;
    focusPreviousCell: (id: string) => () => FocusPreviousCellAction;
    focusNextCell: (id: string) => () => FocusNextCellAction;
    focusCell: (id: string) => ({ source, }?: {
        source?: string;
    }) => FocusCellAction;
    resizeCell: (id: string) => (size?: number) => ResizeCellAction;
    removeCell: (id: string, ids?: string[]) => RemoveCellAction;
    updateCellLayout: (id: string) => (state?: EditorState) => UpdateCellLayoutAction;
    updateCellContent: (id: string) => (state?: EditorState) => UpdateCellContentAction;
};
//# sourceMappingURL=core.d.ts.map