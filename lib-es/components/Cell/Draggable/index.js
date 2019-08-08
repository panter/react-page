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
import { DragSource as dragSource } from 'react-dnd';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { dragActions } from '../../../actions/cell/drag';
import { insertActions } from '../../../actions/cell/insert';
import { source, collect } from './helper/dnd';
const icon = 
// tslint:disable-next-line:max-line-length
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAA6UlEQVRYhe2ZQQ6CMBBFX0njHg7ESXTp1p3uvIBewc3Em3AfdelSFwRDCAm01JRO+pa0lP8zzc9kMCKyAa7AFqhIixdwB44WuACHuHq8KWm1vwtgF1lMCPaWkevUNE3Qr9R17XTu1P5uvUdV+IpbG2qMGBH5xBYRAjUVUWPEjj10SS3XRFry3kha/VBTETVGcmqtDTVGFqdWn7k9ku96f88QNRVRYySn1tpQY8QptXz7qinmnpt7rZTIqbU21BgJ2mv1+XfCDVFTETVGjIg8SG8KP+RZ0I7lU+dmgRNgaKfyZVw9znT/R85fOHJJE77U6UcAAAAASUVORK5CYII=';
class Draggable extends React.PureComponent {
    componentDidMount() {
        const img = new Image();
        img.onload = () => this.props.connectDragPreview(img);
        img.src = icon;
    }
    render() {
        const { isLeaf, connectDragSource, isDragging, isLayoutMode, node: { inline }, children, name, } = this.props;
        if (!isLayoutMode) {
            return (React.createElement("div", { className: "ory-cell-draggable-container" },
                React.createElement("div", { className: "ory-cell-draggable-overlay-placeholder" }),
                children));
        }
        return connectDragSource(React.createElement("div", { className: classNames('ory-cell-draggable', {
                'ory-cell-draggable-is-dragging': isDragging,
            }) },
            React.createElement("div", { className: classNames('ory-cell-draggable-overlay', {
                    [`ory-cell-draggable-inline-${inline}`]: inline,
                    'ory-cell-draggable-leaf': isLeaf,
                }) },
                React.createElement("div", { className: "ory-cell-draggable-overlay-description" },
                    React.createElement("span", null, name))),
            children));
    }
}
const mapDispatchToProps = Object.assign({}, dragActions, insertActions);
export default connect(null, mapDispatchToProps)(dragSource(({ dragType }) => dragType, source, collect)(Draggable));
//# sourceMappingURL=index.js.map