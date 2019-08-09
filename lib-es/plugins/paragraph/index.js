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
import Plugin from '../Plugin';
export const P = 'PARAGRAPH/PARAGRAPH';
const DEFAULT_MAPPING = {
    [P]: 'p',
};
const ALLOWED_TYPES = [P];
// tslint:disable-next-line:no-any
const defaultGetComponent = ({ type }) => DEFAULT_MAPPING[type];
export default class ParagraphPlugin extends Plugin {
    constructor(props = {}) {
        super();
        this.name = 'paragraph';
        /*schema = {
          nodes: { [P]: Paragraph },
        };*/
        // tslint:disable-next-line:no-any
        this.deserialize = (el, next) => {
            switch (el.tagName.toLowerCase()) {
                case 'p':
                    return {
                        object: 'block',
                        type: P,
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
            return next();
            //
        };
        this.getComponent = props.getComponent || defaultGetComponent;
    }
}
//# sourceMappingURL=index.js.map