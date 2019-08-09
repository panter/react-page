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
import CodeIcon from '@material-ui/icons/Code';
import { Data } from 'slate';
import { ToolbarButton } from '../../helpers';
import Plugin from '../Plugin';
import Code from './node';
import DEFAULT_NODE from '../DEFAULT_NODE';
export const CODE = 'CODE/CODE';
const ALLOWED_TYPES = [CODE];
const defaultGetComponent = ({ type, object }) => {
    if (type !== CODE) {
        return null;
    }
    if (object === 'mark') {
        return props => (React.createElement("code", Object.assign({ className: "ory-plugins-content-slate-code" }, props)));
    }
    return Code;
};
export default class CodePlugin extends Plugin {
    constructor(props = {}) {
        super();
        this.name = 'code';
        this.createButton = (type, icon) => ({ editorState, editor }) => {
            const onClick = e => {
                e.preventDefault();
                editor.toggleMark(type);
            };
            const isActive = editorState && editorState.marks.some(mark => mark.type === type);
            return React.createElement(ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
        };
        this.createNodeButton = (type, icon) => ({ editorState, editor, }) => {
            const onClick = e => {
                e.preventDefault();
                const _isActive = editorState.blocks.some(block => block.type === type);
                editor.setBlocks(_isActive ? this.DEFAULT_NODE : type);
            };
            const isActive = editorState.blocks.some(block => block.type === type);
            return React.createElement(ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
        };
        this.deserialize = (el, next) => {
            switch (el.tagName.toLowerCase()) {
                case 'code':
                    return {
                        object: 'mark',
                        type: CODE,
                        data: Data.create({}),
                        nodes: next(el.childNodes),
                    };
                case 'pre':
                    return {
                        object: 'block',
                        type: CODE,
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
            const Component = this.getComponent({
                type: object.type,
                object: object.object,
            });
            if (Component) {
                return React.createElement(Component, { children: children });
            }
            return;
        };
        this.renderMark = (props, editor, next) => {
            const Component = this.getComponent({
                type: props.mark.type,
                object: 'mark',
            });
            if (Component) {
                return React.createElement(Component, Object.assign({}, props));
            }
            return next();
        };
        this.renderNode = (props, editor, next) => {
            if (!ALLOWED_TYPES.includes(props.node.type)) {
                return next();
            }
            const Component = this.getComponent({
                type: props.node.type,
                object: 'block',
                data: props.node.data,
            });
            if (Component) {
                return React.createElement(Component, Object.assign({}, props));
            }
            return next();
        };
        this.getComponent = props.getComponent || defaultGetComponent;
        this.hoverButtons = [this.createButton(CODE, React.createElement(CodeIcon, null))];
        this.toolbarButtons = [this.createNodeButton(CODE, React.createElement(CodeIcon, null))];
        this.DEFAULT_NODE = props.DEFAULT_NODE || DEFAULT_NODE;
    }
}
//# sourceMappingURL=index.js.map