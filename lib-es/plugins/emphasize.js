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
import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import UnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import { ToolbarButton } from '../helpers';
import Plugin from './Plugin';
import isHotkey from 'is-hotkey';
export const STRONG = 'EMPHASIZE/STRONG';
export const EM = 'EMPHASIZE/EM';
export const U = 'EMPHASIZE/U';
const ALLOWED_TYPES = [STRONG, EM, U];
const DEFAULT_MAPPING = {
    [STRONG]: 'strong',
    [EM]: 'em',
    [U]: 'u',
};
const defaultGetComponent = ({ type }) => DEFAULT_MAPPING[type];
// eslint-disable-next-line react/display-name
const createButton = (type, icon) => ({ editor, editorState, }) => {
    const onClick = (e) => {
        e.preventDefault();
        editor.toggleMark(type);
    };
    const isActive = editorState && editorState.activeMarks.some(mark => mark.type === type);
    return React.createElement(ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
};
export default class EmphasizePlugin extends Plugin {
    constructor(props = {}) {
        super();
        this.name = 'emphasize';
        this.hoverButtons = [
            createButton(STRONG, React.createElement(BoldIcon, null)),
            createButton(EM, React.createElement(ItalicIcon, null)),
            createButton(U, React.createElement(UnderlinedIcon, null)),
        ];
        this.onKeyDown = (e, editor, next) => {
            let mark;
            if (isHotkey('mod+b', e)) {
                mark = STRONG;
            }
            if (isHotkey('mod+i', e)) {
                mark = EM;
            }
            if (isHotkey('mod+u', e)) {
                mark = U;
            }
            if (mark) {
                editor.toggleMark(mark);
                e.preventDefault();
                return true;
            }
            else {
                return next();
            }
        };
        this.deserialize = (el, next) => {
            switch (el.tagName.toLowerCase()) {
                case 'strong':
                case 'b':
                    return {
                        object: 'mark',
                        type: STRONG,
                        nodes: next(el.childNodes),
                    };
                case 'em':
                case 'i':
                    return {
                        object: 'mark',
                        type: EM,
                        nodes: next(el.childNodes),
                    };
                case 'u':
                    return {
                        object: 'mark',
                        type: U,
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
            if (object.object !== 'mark') {
                return;
            }
            if (!ALLOWED_TYPES.includes(object.type)) {
                return;
            }
            const Component = this.getComponent({
                type: object.type,
                data: object.data,
                object: 'mark',
            });
            if (Component) {
                return React.createElement(Component, null, children);
            }
            return;
        };
        this.renderMark = (props, editor, next) => {
            const { children, mark, attributes } = props;
            if (!ALLOWED_TYPES.includes(mark.type)) {
                return next();
            }
            const Component = this.getComponent({ type: mark.type, object: 'mark' });
            if (Component) {
                return React.createElement(Component, Object.assign({}, attributes), children);
            }
            return next();
        };
        this.getComponent = props.getComponent || defaultGetComponent;
    }
}
//# sourceMappingURL=emphasize.js.map