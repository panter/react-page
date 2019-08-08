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
// tslint:disable-next-line:no-any
const nodeInner = (current, props) => {
    const { id, rows = [], cells = [] } = current;
    if (id === props.id) {
        return current;
    }
    let found = undefined;
    // tslint:disable-next-line:no-any
    [...rows, ...cells].find(n => {
        const f = nodeInner(n, props);
        if (f) {
            found = f;
        }
        return Boolean(f);
    });
    return found;
};
export const editable = (state, { id }) => state &&
    state.reactPage &&
    state.reactPage.editables &&
    state.reactPage.editables.present.find(({ id: current } = {}) => current === id);
export const editables = ({ reactPage: { editables: { present }, }, }) => present;
export const purifiedEditable = (state, props) => {
    const found = editable(state, props);
    if (!found) {
        return null;
    }
    return Object.assign({}, found, { cells: (found.cells || []).map((c) => typeof c === 'string' ? c : c.id) });
};
export const editableConfig = (state, { editable: id }) => editable(state, { id }).config;
export const node = (state, props
// tslint:disable-next-line:no-any
) => {
    const tree = editable(state, { id: props.editable });
    if (!tree) {
        throw new Error(`Could not find editable: ${props.editable}`);
    }
    return Object.assign({}, nodeInner(tree, props));
};
export const searchNodeEverywhere = (state, id) => {
    for (let i = 0; i < state.reactPage.editables.present.length; i++) {
        const n = node(state, { id, editable: state.reactPage.editables.present[i].id });
        if (n.id) {
            return {
                node: n,
                editable: state.reactPage.editables.present[i],
            };
        }
    }
    return null;
};
export const purifiedNode = (state, props) => {
    const found = node(state, props);
    if (!found) {
        return null;
    }
    if (found.cells) {
        found.cells = found.cells.map((c) => c.id
        // tslint:disable-next-line:no-any
        );
    }
    if (found.rows) {
        found.rows = found.rows.map((r) => r.id
        // tslint:disable-next-line:no-any
        );
    }
    return found;
};
//# sourceMappingURL=index.js.map