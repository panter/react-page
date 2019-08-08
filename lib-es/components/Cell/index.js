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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Inner from './Inner';
import { editableConfig, node, purifiedNode } from '../../selector/editable';
import { isPreviewMode, isEditMode, isResizeMode, isInsertMode, isLayoutMode } from '../../selector/display';
import { resizeCell, focusCell, blurAllCells } from '../../actions/cell';
import Resizable from './Resizable';
const gridClass = (_a) => {
    var { node: { size } } = _a, rest = __rest(_a, ["node"]);
    if (rest.isPreviewMode || rest.isEditMode) {
        return `ory-cell-${rest.isPreviewMode || rest.isEditMode ? 'sm' : 'xs'}-${size || 12} ory-cell-xs-12`;
    }
    return `ory-cell-xs-${size || 12}`;
};
const stopClick = (_isEditMode) => (e) => (_isEditMode ? e.stopPropagation() : null);
class Cell extends React.PureComponent {
    render() {
        const { id, rowWidth, rowHeight, updateDimensions, node: { inline, resizable, hasInlineNeighbour, focused }, } = this.props;
        return (React.createElement("div", { className: classNames('ory-cell', gridClass(this.props), {
                'ory-cell-has-inline-neighbour': hasInlineNeighbour,
                [`ory-cell-inline-${inline || ''}`]: inline,
                'ory-cell-focused': focused,
                'ory-cell-resizing-overlay': this.props.isResizeMode,
                'ory-cell-bring-to-front': !this.props.isResizeMode && !this.props.isLayoutMode && inline,
            }), onClick: stopClick(this.props.isEditMode) }, resizable && this.props.isResizeMode ? (React.createElement(Resizable, Object.assign({}, this.props, { id: id, rowWidth: rowWidth, rowHeight: rowHeight, updateDimensions: updateDimensions, node: this.props.node, steps: 12, onChange: this.props.resizeCell }),
            React.createElement(Inner, Object.assign({}, this.props, { styles: null })))) : (React.createElement(Inner, Object.assign({}, this.props, { styles: null })))));
    }
}
const mapStateToProps = createStructuredSelector({
    isPreviewMode,
    isEditMode,
    isResizeMode,
    // required by sub-components
    isInsertMode,
    isLayoutMode,
    config: editableConfig,
    node: purifiedNode,
    rawNode: (state, props) => () => node(state, props),
});
const mapDispatchToProps = (dispatch, { id }) => bindActionCreators({
    resizeCell: resizeCell(id),
    focusCell: focusCell(id),
    blurAllCells,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Cell);
//# sourceMappingURL=index.js.map