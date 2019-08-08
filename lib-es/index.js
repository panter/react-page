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
import * as React from 'react';
import classNames from 'classnames';
import PluginService from '@react-page/core/lib/service/plugin';
import { editable as reducer } from '@react-page/core/lib/reducer/editable';
const gridClass = (size = 12) => `ory-cell-sm-${size} ory-cell-xs-12`;
const HTMLRow = ({ cells = [], className, hasInlineChildren, }) => (React.createElement("div", { className: classNames('ory-row', className, {
        'ory-row-has-floating-children': hasInlineChildren,
    }) }, cells.map((c) => (React.createElement(HTMLCell, Object.assign({ key: c.id }, c))))));
// eslint-disable-next-line no-empty-function
const noop = () => {
    return;
};
const HTMLCell = props => {
    const { rows = [], layout = {}, content = {}, hasInlineNeighbour, inline, size, id, } = props;
    const cn = classNames('ory-cell', gridClass(size), {
        'ory-cell-has-inline-neighbour': hasInlineNeighbour,
        [`ory-cell-inline-${inline || ''}`]: inline,
    });
    if (layout.plugin) {
        const { state, plugin: { Component, name, version }, } = layout;
        return (React.createElement("div", { className: cn },
            React.createElement("div", { className: "ory-cell-inner" },
                React.createElement(Component, { readOnly: true, state: state, onChange: noop, id: id, name: name, focused: false, version: version }, rows.map((r) => (React.createElement(HTMLRow, Object.assign({ key: r.id }, r, { className: "ory-cell-inner" }))))))));
    }
    else if (content.plugin) {
        const { state, plugin: { Component, name, version }, } = content;
        return (React.createElement("div", { className: cn },
            React.createElement("div", { className: "ory-cell-inner ory-cell-leaf" },
                React.createElement(Component, { isPreviewMode: true, readOnly: true, state: state, onChange: noop, id: id, name: name, focused: false, version: version, isEditMode: false, isLayoutMode: false, isResizeMode: false, isInsertMode: false }))));
    }
    else if (rows.length > 0) {
        return (React.createElement("div", { className: cn }, rows.map((r) => (React.createElement(HTMLRow, Object.assign({ key: r.id }, r, { className: "ory-cell-inner" }))))));
    }
    return (React.createElement("div", { className: cn },
        React.createElement("div", { className: "ory-cell-inner" })));
};
export const HTMLRenderer = ({ state, plugins, }) => {
    const service = new PluginService(plugins);
    const props = reducer(service.unserialize(state), { type: 'renderer/noop' });
    return React.createElement(HTMLRow, Object.assign({}, props));
};
//# sourceMappingURL=index.js.map