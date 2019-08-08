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
import Avatar from '@material-ui/core/Avatar';
import draggable from '../Draggable/index';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DragHandle from '@material-ui/icons/DragHandle';
import Tooltip from 'rc-tooltip';
class Item extends React.Component {
    constructor(props) {
        super(props);
        this.onMouseEnter = () => {
            this.setState({ tooltipVisible: true });
        };
        this.onMouseLeave = () => {
            this.setState({ tooltipVisible: false });
        };
        this.state = {
            tooltipVisible: false,
        };
    }
    render() {
        const { plugin, insert } = this.props;
        if (!plugin.IconComponent && !plugin.text) {
            // logger.warn('Plugin text or plugin icon missing', plugin)
            return null;
        }
        const Draggable = draggable(plugin.name);
        // not using css modules here because they don't work with svg icons
        return (React.createElement(ListItem, { className: "ory-toolbar-item" },
            React.createElement(Avatar, { children: plugin.IconComponent }),
            React.createElement(ListItemText, { primary: plugin.text, secondary: plugin.description }),
            React.createElement("span", { className: "ory-toolbar-item-drag-handle-button", onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave, onMouseDown: this.onMouseLeave },
                React.createElement(Draggable, { insert: insert },
                    React.createElement(Tooltip, { visible: this.state.tooltipVisible, placement: "bottomLeft", overlay: React.createElement("span", null, this.props.translations.dragMe) },
                        React.createElement(DragHandle, { className: "ory-toolbar-item-drag-handle" }))))));
    }
}
export default Item;
//# sourceMappingURL=index.js.map