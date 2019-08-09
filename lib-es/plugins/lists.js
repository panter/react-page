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
/* eslint-disable prefer-reflect, default-case, react/display-name */
import * as React from 'react';
import ListIcon from '@material-ui/icons/List';
import OrderedListIcon from '@material-ui/icons/FormatListNumbered';
import IncreaseIndentIcon from '@material-ui/icons/FormatIndentIncrease';
import DecreaseIndentIcon from '@material-ui/icons/FormatIndentDecrease';
import createListPlugin from '@guestbell/slate-edit-list';
import { ToolbarButton } from '../helpers';
import Plugin from './Plugin';
import DEFAULT_NODE from './DEFAULT_NODE';
export const UL = 'LISTS/UNORDERED-LIST';
export const OL = 'LISTS/ORDERED-LIST';
export const LI = 'LISTS/LIST-ITEM';
const INCREASE_INDENT = 'INCREASE_INDENT';
const DECREASE_INDENT = 'DECREASE_INDENT';
const ALLOWED_TYPES = [UL, OL, LI];
const DEFAULT_MAPPING = {
    [UL]: 'ul',
    [OL]: 'ol',
    [LI]: 'li',
};
const defaultGetComponent = ({ type }) => DEFAULT_MAPPING[type];
export default class ListsPlugin extends Plugin {
    constructor(props = {}) {
        super();
        this.name = 'lists';
        this.createButton = (type, icon) => ({ editorState, editor, }) => {
            const { wrapInList, unwrapList, increaseItemDepth, decreaseItemDepth, } = this.plugin.changes;
            const onClick = e => {
                e.preventDefault();
                if (type !== UL && type !== OL) {
                    if (type === INCREASE_INDENT) {
                        increaseItemDepth(editor);
                    }
                    else {
                        decreaseItemDepth(editor);
                    }
                }
                else {
                    const _inList = this.plugin.utils.isSelectionInList(editorState);
                    if (_inList) {
                        unwrapList(editor);
                    }
                    else {
                        wrapInList(editor, type);
                    }
                }
            };
            const inList = this.plugin.utils.isSelectionInList(editorState);
            const isType = editorState.blocks.some(block => !!editorState.document.getClosest(block.key, parent => parent.type === type));
            const isIncreaseDecrease = type === INCREASE_INDENT || type === DECREASE_INDENT;
            const previousItem = this.plugin.utils.getPreviousItem(editorState);
            const currentItem = this.plugin.utils.getCurrentItem(editorState);
            const itemDepth = this.plugin.utils.getItemDepth(editorState);
            const canIncreaseIndent = previousItem && currentItem && isIncreaseDecrease;
            const canDecreaseIndent = itemDepth > 1 && currentItem && isIncreaseDecrease;
            const increaseDecreaseDisabled = type === INCREASE_INDENT ? !canIncreaseIndent : !canDecreaseIndent;
            return (React.createElement(ToolbarButton, { onClick: onClick, isActive: inList && isType, icon: icon, disabled: isIncreaseDecrease && increaseDecreaseDisabled }));
        };
        this.deserialize = (el, next) => {
            switch (el.tagName.toLowerCase()) {
                case 'ul':
                    return {
                        object: 'block',
                        type: UL,
                        nodes: next(el.childNodes),
                    };
                case 'li':
                    return {
                        object: 'block',
                        type: LI,
                        nodes: next(el.childNodes),
                    };
                case 'ol':
                    return {
                        object: 'block',
                        type: OL,
                        nodes: next(el.childNodes),
                    };
                default:
                    return undefined;
            }
        };
        this.serialize = (
        // tslint:disable-next-line:no-any
        object, 
        // tslint:disable-next-line:no-any
        children) => {
            if (object.object !== 'block') {
                return;
            }
            if (!ALLOWED_TYPES.includes(object.type)) {
                return;
            }
            const Component = this.getComponent({
                object: 'block',
                type: object.type,
                data: object.data,
            });
            if (Component) {
                return React.createElement(Component, null, children);
            }
        };
        this.renderNode = (props, editor, next) => {
            const { children, attributes } = props;
            if (!ALLOWED_TYPES.includes(props.node.type)) {
                return next();
            }
            const Component = this.getComponent({
                object: 'block',
                type: props.node.type,
                data: props.node.data,
            });
            if (Component) {
                return React.createElement(Component, Object.assign({}, attributes), children);
            }
            return next();
        };
        this.DEFAULT_NODE = props.DEFAULT_NODE || DEFAULT_NODE;
        this.getComponent = props.getComponent || defaultGetComponent;
        this.plugin = createListPlugin({
            types: [UL, OL],
            typeItem: LI,
            typeDefault: this.DEFAULT_NODE,
        });
        this.plugins = [this.plugin];
        this.toolbarButtons = [
            this.createButton(UL, React.createElement(ListIcon, null)),
            this.createButton(OL, React.createElement(OrderedListIcon, null)),
            this.createButton(INCREASE_INDENT, React.createElement(IncreaseIndentIcon, null)),
            this.createButton(DECREASE_INDENT, React.createElement(DecreaseIndentIcon, null)),
        ];
    }
}
//# sourceMappingURL=lists.js.map