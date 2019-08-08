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
var helpers_1 = require("../helpers");
exports.CELL_UPDATE_CONTENT = 'CELL_UPDATE_CONTENT';
exports.CELL_UPDATE_LAYOUT = 'CELL_UPDATE_LAYOUT';
exports.CELL_REMOVE = 'CELL_REMOVE';
exports.CELL_RESIZE = 'CELL_RESIZE';
exports.CELL_FOCUS = 'CELL_FOCUS';
exports.CELL_BLUR = 'CELL_BLUR';
exports.CELL_BLUR_ALL = 'CELL_BLUR_ALL';
exports.CELL_FOCUS_PREV = 'CELL_FOCUS_PREV';
exports.CELL_FOCUS_NEXT = 'CELL_FOCUS_NEXT';
exports.CELL_CREATE_FALLBACK = 'CELL_CREATE_FALLBACK';
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
exports.updateCellContent = function (id) { return function (state) {
    if (state === void 0) { state = {}; }
    return ({
        type: exports.CELL_UPDATE_CONTENT,
        ts: new Date(),
        id: id,
        state: state,
    });
}; };
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
exports.updateCellLayout = function (id) { return function (state) {
    if (state === void 0) { state = {}; }
    return ({
        type: exports.CELL_UPDATE_LAYOUT,
        ts: new Date(),
        id: id,
        state: state,
    });
}; };
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
exports.removeCell = function (id, ids) {
    if (ids === void 0) { ids = []; }
    return ({
        type: exports.CELL_REMOVE,
        ts: new Date(),
        id: id,
        ids: ids.length > 0 ? ids : helpers_1.gen(1),
    });
};
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
exports.resizeCell = function (id) { return function (size) {
    if (size === void 0) { size = 1; }
    return ({
        type: exports.CELL_RESIZE,
        ts: new Date(),
        id: id,
        size: size,
    });
}; };
/**
 * Dispatch to focus a cell.
 */
exports.focusCell = function (id) { return function (_a) {
    var source = (_a === void 0 ? {} : _a).source;
    return ({
        type: exports.CELL_FOCUS,
        ts: new Date(),
        id: id,
        source: source,
    });
}; };
/**
 * Dispatch to focus a cell.
 */
exports.focusNextCell = function (id) { return function () { return ({
    type: exports.CELL_FOCUS_NEXT,
    ts: new Date(),
    id: id,
}); }; };
/**
 * Dispatch to focus a cell.
 */
exports.focusPreviousCell = function (id) { return function () { return ({
    type: exports.CELL_FOCUS_PREV,
    ts: new Date(),
    id: id,
}); }; };
/**
 * Dispatch to blur a cell.
 */
exports.blurCell = function (id) { return function () { return ({
    type: exports.CELL_BLUR,
    ts: new Date(),
    id: id,
}); }; };
/**
 * Dispatch to blur all cells. For example when clicking on document body.
 */
exports.blurAllCells = function () { return ({
    type: exports.CELL_BLUR_ALL,
    ts: new Date(),
}); };
/**
 * Creates a fallback cell, usually done when an editable is empty.
 */
exports.createFallbackCell = function (
// tslint:disable-next-line:no-any
fallback, editable) { return ({
    type: exports.CELL_CREATE_FALLBACK,
    ts: new Date(),
    editable: editable,
    ids: helpers_1.gen(1),
    fallback: fallback,
}); };
exports.coreActions = {
    createFallbackCell: exports.createFallbackCell,
    blurAllCells: exports.blurAllCells,
    blurCell: exports.blurCell,
    focusPreviousCell: exports.focusPreviousCell,
    focusNextCell: exports.focusNextCell,
    focusCell: exports.focusCell,
    resizeCell: exports.resizeCell,
    removeCell: exports.removeCell,
    updateCellLayout: exports.updateCellLayout,
    updateCellContent: exports.updateCellContent,
};
//# sourceMappingURL=core.js.map