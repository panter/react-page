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
import BlockquoteIcon from '@material-ui/icons/FormatQuote';
import * as React from 'react';
import createBlockquotePlugin from '@guestbell/slate-edit-blockquote';
import { ToolbarButton } from '../helpers';
import Plugin from './Plugin';
import DEFAULT_NODE from './DEFAULT_NODE';
export const BLOCKQUOTE = 'BLOCKQUOTE/BLOCKQUOTE';
const ALLOWED_TYPES = [BLOCKQUOTE];
const DEFAULT_MAPPING = {
    [BLOCKQUOTE]: 'blockquote',
};
const defaultGetComponent = ({ type }) => DEFAULT_MAPPING[type];
export default class BlockquotePlugin extends Plugin {
    constructor(props = {}) {
        super();
        this.name = 'blockquote';
        /*schema = {
          nodes: {
            [BLOCKQUOTE]: makeTagNode('blockquote'),
          },
        };*/
        // tslint:disable-next-line:no-any
        this.plugins = [
            createBlockquotePlugin({
                type: BLOCKQUOTE,
                typeDefault: this.DEFAULT_NODE,
            }),
        ];
        // eslint-disable-next-line react/display-name
        this.Button = ({ editorState, editor }) => {
            const onClick = e => {
                e.preventDefault();
                const _isActive = editorState.blocks.some(block => Boolean(editorState.document.getClosest(block.key, parent => parent.type === BLOCKQUOTE)));
                if (_isActive) {
                    editor.unwrapBlock(BLOCKQUOTE);
                }
                else {
                    editor.wrapBlock(BLOCKQUOTE);
                }
            };
            const isActive = editorState.blocks.some(block => Boolean(editorState.document.getClosest(block.key, parent => parent.type === BLOCKQUOTE)));
            return (React.createElement(ToolbarButton, { onClick: onClick, isActive: isActive, icon: React.createElement(BlockquoteIcon, null) }));
        };
        this.deserialize = (el, next) => {
            switch (el.tagName.toLowerCase()) {
                case 'blockquote':
                    return {
                        object: 'block',
                        type: BLOCKQUOTE,
                        nodes: next(el.childNodes),
                    };
                default:
                    return;
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
                type: object.type,
                object: 'block',
                data: object.data,
            });
            if (Component) {
                return (React.createElement(Component, { style: { textAlign: object.data.get('align') } }, children));
            }
        };
        this.renderNode = (props, editor, next) => {
            // tslint:disable-next-line:no-any
            if (!ALLOWED_TYPES.includes(props.node.type)) {
                return next();
            }
            const Component = this.getComponent({
                type: props.node.type,
                object: 'block',
                data: props.node.data,
            });
            if (Component) {
                return (React.createElement(Component, { style: { textAlign: props.node.data.get('align') } }, props.children));
            }
        };
        this.DEFAULT_NODE = props.DEFAULT_NODE || DEFAULT_NODE;
        this.toolbarButtons = [this.Button];
        this.getComponent = props.getComponent || defaultGetComponent;
    }
}
//# sourceMappingURL=blockquote.js.map