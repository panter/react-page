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
import pathOr from 'ramda/src/pathOr';
import { optimizeCell, optimizeRow, optimizeRows, optimizeCells, flatten } from './helper/optimize';
import { mergeDecorator } from './helper/merge';
import { isHoveringThis } from './helper/hover';
import { resizeCells } from './helper/sizing';
import { computeRow } from './helper/inline';
import { createCell, createRow } from '../../types/editable';
import { CELL_REMOVE, CELL_UPDATE_LAYOUT, CELL_UPDATE_CONTENT, CELL_INSERT_LEFT_OF, CELL_INSERT_RIGHT_OF, CELL_INSERT_ABOVE, CELL_INSERT_BELOW, CELL_INSERT_INLINE_LEFT, CELL_INSERT_INLINE_RIGHT, CELL_DRAG_HOVER, CELL_RESIZE, CELL_FOCUS, CELL_BLUR, CELL_BLUR_ALL } from '../../actions/cell';
const inner = (cb, action) => (state) => cb(state, action);
const identity = (state) => state;
export const cell = (s, a) => optimizeCell(((state, action) => {
    const reduce = () => {
        const content = pathOr(identity, ['content', 'plugin', 'reducer'], state);
        const layout = pathOr(identity, ['layout', 'plugin', 'reducer'], state);
        return content(layout(Object.assign({}, state, { hover: null, rows: rows(state.rows, action) }), action), action);
    };
    switch (action.type) {
        case CELL_UPDATE_CONTENT:
            if (action.id === state.id) {
                // If this cell is being updated, set the data
                const reduced = reduce();
                return Object.assign({}, reduced, { content: Object.assign({}, (state.content || {}), { state: Object.assign({}, pathOr({}, ['content', 'state'], reduced), action.state) }) });
            }
            return reduce();
        case CELL_UPDATE_LAYOUT:
            if (action.id === state.id) {
                // If this cell is being updated, set the data
                const reduced = reduce();
                return Object.assign({}, reduced, { layout: Object.assign({}, (state.layout || {}), { state: Object.assign({}, pathOr({}, ['layout', 'state'], reduced), action.state) }) });
            }
            return reduce();
        case CELL_FOCUS:
            if (action.id === state.id) {
                // If this cell is being focused, set the data
                return Object.assign({}, reduce(), { focused: true, focusSource: action.source });
            }
            return Object.assign({}, reduce(), { focused: false, focusSource: null });
        case CELL_BLUR:
            if (action.id === state.id) {
                // If this cell is being blurred, set the data
                return Object.assign({}, reduce(), { focused: false, focusSource: null });
            }
            return reduce();
        case CELL_BLUR_ALL:
            return Object.assign({}, reduce(), { focused: false });
        case CELL_DRAG_HOVER:
            if (isHoveringThis(state, action)) {
                // if this is the cell we're hovering, set the hover attribute
                return Object.assign({}, reduce(), { hover: action.position });
            }
            // or remove it if not
            return reduce();
        case CELL_INSERT_ABOVE:
            if (isHoveringThis(state, action)) {
                return Object.assign({}, createCell(), { id: action.ids[0], hover: null, rows: rows([
                        Object.assign({}, createRow(), { id: action.ids[1], cells: [Object.assign({}, action.item, { id: action.ids[2], inline: null })] }),
                        Object.assign({}, createRow(), { id: action.ids[3], cells: [Object.assign({}, reduce(), { id: action.ids[4] })] }),
                    ], Object.assign({}, action, { hover: null })) });
            }
            return reduce();
        case CELL_INSERT_BELOW:
            if (isHoveringThis(state, action)) {
                return Object.assign({}, createCell(), { id: action.ids[0], hover: null, rows: rows([
                        Object.assign({}, createRow(), { id: action.ids[1], cells: [Object.assign({}, reduce(), { id: action.ids[2] })] }),
                        Object.assign({}, createRow(), { id: action.ids[3], cells: [Object.assign({}, action.item, { id: action.ids[4], inline: null })] }),
                    ], Object.assign({}, action, { hover: null })) });
            }
            return reduce();
        default:
            return reduce();
    }
})(s, a));
export const cells = (s = [], a) => optimizeCells(((state, action) => {
    switch (action.type) {
        case CELL_RESIZE:
            // tslint:disable-next-line:no-any
            return resizeCells(state.map(inner(cell, action)), action);
        case CELL_INSERT_BELOW:
        case CELL_INSERT_ABOVE:
            return state
                .filter((c) => c.id !== action.item.id)
                .map(inner(cell, action));
        case CELL_INSERT_LEFT_OF:
            return state
                .filter((c) => c.id !== action.item.id)
                .map((c) => isHoveringThis(c, action)
                ? [
                    Object.assign({}, action.item, { id: action.ids[0], inline: null }),
                    Object.assign({}, c, { id: action.ids[1] }),
                ]
                : [c])
                .reduce(flatten, [])
                .map(inner(cell, action));
        case CELL_INSERT_RIGHT_OF:
            return state
                .filter((c) => c.id !== action.item.id)
                .map((c) => isHoveringThis(c, action)
                ? [
                    Object.assign({}, c, { id: action.ids[0] }),
                    Object.assign({}, action.item, { id: action.ids[1], inline: null }),
                ]
                : [c])
                .reduce(flatten, [])
                .map(inner(cell, action));
        case CELL_INSERT_INLINE_RIGHT:
        case CELL_INSERT_INLINE_LEFT:
            return state
                .filter((c) => c.id !== action.item.id)
                .map((c) => {
                if (isHoveringThis(c, action)) {
                    return [
                        Object.assign({}, createCell(), { id: action.ids[0], rows: [
                                Object.assign({}, createRow(), { id: action.ids[1], cells: [
                                        Object.assign({}, action.item, { inline: action.type === CELL_INSERT_INLINE_RIGHT
                                                ? 'right'
                                                : 'left', id: action.ids[2], size: 0 }),
                                        Object.assign({}, c, { id: action.ids[3], inline: null, hasInlineNeighbour: action.ids[2], size: 0 }),
                                    ] }),
                            ] }),
                    ];
                }
                return [c];
            })
                .reduce(flatten, [])
                .map(inner(cell, action));
        case CELL_REMOVE:
            return state
                .filter(({ id }) => id !== action.id)
                .map(inner(cell, action));
        default:
            return state.map(inner(cell, action));
    }
})(s, a));
export const row = (s, a) => computeRow(optimizeRow(((state, action) => {
    const reduce = () => (Object.assign({}, state, { hover: null, cells: cells(state.cells, action) }));
    switch (action.type) {
        case CELL_INSERT_LEFT_OF:
            if (!isHoveringThis(state, action)) {
                return reduce();
            }
            return Object.assign({}, state, { hover: null, cells: cells([
                    Object.assign({}, action.item, { id: action.ids[0], inline: null }),
                    ...state.cells,
                ], Object.assign({}, action, { hover: null })) });
        case CELL_INSERT_RIGHT_OF:
            if (!isHoveringThis(state, action)) {
                return reduce();
            }
            return Object.assign({}, state, { hover: null, cells: cells([
                    ...state.cells,
                    Object.assign({}, action.item, { id: action.ids[0], inline: null }),
                ], Object.assign({}, action, { hover: null })) });
        case CELL_DRAG_HOVER:
            if (isHoveringThis(state, action)) {
                return Object.assign({}, reduce(), { hover: action.position });
            }
            return reduce();
        default:
            return reduce();
    }
})(s, a)));
export const rows = (s = [], a) => optimizeRows(
// tslint:disable-next-line:no-any
mergeDecorator(a)(((state, action) => {
    const reduce = () => state.map(inner(row, action));
    switch (action.type) {
        case CELL_INSERT_ABOVE:
            return state
                .map((r) => isHoveringThis(r, action)
                ? [
                    Object.assign({}, createRow(), { cells: [
                            Object.assign({}, action.item, { id: action.ids[1], inline: null }),
                        ], id: action.ids[0] }),
                    Object.assign({}, r, { id: action.ids[2] }),
                ]
                : [r])
                .reduce(flatten, [])
                .map(inner(row, action));
        case CELL_INSERT_BELOW:
            return state
                .map((r) => isHoveringThis(r, action)
                ? [
                    Object.assign({}, r, { id: action.ids[0] }),
                    Object.assign({}, createRow(), { cells: [
                            Object.assign({}, action.item, { id: action.ids[2], inline: null }),
                        ], id: action.ids[1] }),
                ]
                : [r])
                .reduce(flatten, [])
                .map(inner(row, action));
        default:
            return reduce();
    }
})(s, a)));
//# sourceMappingURL=tree.js.map