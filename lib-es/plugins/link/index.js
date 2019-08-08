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
/* eslint-disable no-alert, prefer-reflect, default-case, react/display-name */
import * as React from 'react';
import Plugin from '../Plugin';
import { Data } from 'slate';
import { lazyLoad } from '@react-page/core';
const LinkButton = lazyLoad(() => import('./LinkButton'));
export const A = 'LINK/LINK';
const ALLOWED_TYPES = [A];
const DEFAULT_MAPPING = {
    [A]: 'a',
};
// tslint:disable-next-line:no-any
const defaultGetComponent = ({ type }) => DEFAULT_MAPPING[type];
export default class LinkPlugin extends Plugin {
    constructor(props = {}) {
        super();
        this.name = 'link';
        /*schema = {
          nodes: { [A]: Link },
        };*/
        this.hoverButtons = [LinkButton];
        this.toolbarButtons = [LinkButton];
        this.deserialize = (el, next) => {
            switch (el.tagName.toLowerCase()) {
                case 'a':
                    return {
                        object: 'inline',
                        type: A,
                        nodes: next(el.childNodes),
                        data: Data.create({
                            href: (el.attrs.find(({ name }) => name === 'href') || {
                                value: '',
                            }).value,
                        }),
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
            if (object.object !== 'inline') {
                return;
            }
            const Component = this.getComponent({
                type: object.type,
                object: 'inline',
                data: object.data,
            });
            if (!Component) {
                return null;
            }
            return React.createElement(Component, { href: object.data.get('href') }, children);
        };
        this.renderNode = (props, editor, next) => {
            if (!ALLOWED_TYPES.includes(props.node.type)) {
                return next();
            }
            const Component = this.getComponent({
                type: props.node.type,
                object: 'inline',
                data: props.node.data,
            });
            if (Component) {
                return React.createElement(Component, Object.assign({}, props));
            }
            return next();
        };
        this.getComponent = props.getComponent || defaultGetComponent;
    }
}
//# sourceMappingURL=index.js.map