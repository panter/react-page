"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var redux_1 = require("redux");
var core_1 = require("./cell/core");
var drag_1 = require("./cell/drag");
var insert_1 = require("./cell/insert");
var undo_1 = require("./undo");
var editables_1 = require("./editables");
var display_1 = require("./display");
exports.actions = function (dispatch) { return ({
    cell: {
        updateContent: function (id, state) {
            return dispatch(core_1.updateCellContent(id)(state));
        },
        updateLayout: function (id, state) {
            return dispatch(core_1.updateCellLayout(id)(state));
        },
        remove: redux_1.bindActionCreators({ removeCell: core_1.removeCell }, dispatch).removeCell,
        resize: function (id, size) { return dispatch(core_1.resizeCell(id)(size)); },
        focus: function (id, source) { return dispatch(core_1.focusCell(id)(source)); },
        focusNext: function (id) { return dispatch(core_1.focusNextCell(id)()); },
        focusPrevious: function (id) { return dispatch(core_1.focusPreviousCell(id)()); },
        blurAll: redux_1.bindActionCreators({ blurAllCells: core_1.blurAllCells }, dispatch).blurAllCells,
        drag: redux_1.bindActionCreators({ dragCell: drag_1.dragCell }, dispatch).dragCell,
        cancelDrag: redux_1.bindActionCreators({ cancelCellDrag: drag_1.cancelCellDrag }, dispatch).cancelCellDrag,
        hoverLeftOf: redux_1.bindActionCreators({ cellHoverLeftOf: drag_1.cellHoverLeftOf }, dispatch)
            .cellHoverLeftOf,
        hoverRightOf: redux_1.bindActionCreators({ cellHoverRightOf: drag_1.cellHoverRightOf }, dispatch)
            .cellHoverRightOf,
        hoverAbove: redux_1.bindActionCreators({ cellHoverAbove: drag_1.cellHoverAbove }, dispatch).cellHoverAbove,
        hoverBelow: redux_1.bindActionCreators({ cellHoverBelow: drag_1.cellHoverBelow }, dispatch).cellHoverBelow,
        hoverFloatingLeft: redux_1.bindActionCreators({ cellHoverInlineLeft: drag_1.cellHoverInlineLeft }, dispatch)
            .cellHoverInlineLeft,
        hoverFloatingRight: redux_1.bindActionCreators({ cellHoverInlineRight: drag_1.cellHoverInlineRight }, dispatch)
            .cellHoverInlineRight,
        clearHover: redux_1.bindActionCreators({ clearHover: drag_1.clearHover }, dispatch).clearHover,
        insertBelow: redux_1.bindActionCreators({ insertCellBelow: insert_1.insertCellBelow }, dispatch)
            .insertCellBelow,
        insertAbove: redux_1.bindActionCreators({ insertCellAbove: insert_1.insertCellAbove }, dispatch)
            .insertCellAbove,
        insertRightOf: redux_1.bindActionCreators({ insertCellRightOf: insert_1.insertCellRightOf }, dispatch)
            .insertCellRightOf,
        insertLeftOf: redux_1.bindActionCreators({ insertCellLeftOf: insert_1.insertCellLeftOf }, dispatch)
            .insertCellLeftOf,
        insertFloatingLeft: redux_1.bindActionCreators({ insertCellLeftInline: insert_1.insertCellLeftInline }, dispatch)
            .insertCellLeftInline,
        insertFloatingRight: redux_1.bindActionCreators({ insertCellRightInline: insert_1.insertCellRightInline }, dispatch)
            .insertCellRightInline,
    },
    editable: {
        add: redux_1.bindActionCreators({ updateEditable: editables_1.updateEditable }, dispatch).updateEditable,
        update: redux_1.bindActionCreators({ updateEditable: editables_1.updateEditable }, dispatch).updateEditable,
    },
    mode: {
        insert: redux_1.bindActionCreators({ insertMode: display_1.insertMode }, dispatch).insertMode,
        edit: redux_1.bindActionCreators({ editMode: display_1.editMode }, dispatch).editMode,
        preview: redux_1.bindActionCreators({ previewMode: display_1.previewMode }, dispatch).previewMode,
        layout: redux_1.bindActionCreators({ layoutMode: display_1.layoutMode }, dispatch).layoutMode,
        resize: redux_1.bindActionCreators({ resizeMode: display_1.resizeMode }, dispatch).resizeMode,
    },
    undo: redux_1.bindActionCreators({ undo: undo_1.undo }, dispatch).undo,
    redo: redux_1.bindActionCreators({ redo: undo_1.redo }, dispatch).redo,
}); };
//# sourceMappingURL=index.js.map