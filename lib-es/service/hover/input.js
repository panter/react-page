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
import { findDOMNode } from 'react-dom';
import HoverService from '../hover';
const hoverService = new HoverService();
export const computeCurrentDropPosition = (actions, hover, drag, monitor, component, matrixName) => {
    const mousePosition = monitor.getClientOffset();
    /* eslint-disable react/no-find-dom-node */
    const componentPosition = findDOMNode(component).getBoundingClientRect();
    const room = {
        height: componentPosition.bottom - componentPosition.top,
        width: componentPosition.right - componentPosition.left,
    };
    const mouse = {
        y: mousePosition.y - componentPosition.top,
        x: mousePosition.x - componentPosition.left,
    };
    hoverService.hover(drag, hover, actions, { room, mouse, matrix: matrixName });
};
export const computeAndDispatchInsert = (_a, drag, monitor, component, matrixName = '10x10') => {
    var { insertCellAbove: above, insertCellBelow: below, insertCellLeftOf: leftOf, insertCellRightOf: rightOf, insertCellLeftInline: inlineLeft, insertCellRightInline: inlineRight, clearHover: clear } = _a, hover = __rest(_a, ["insertCellAbove", "insertCellBelow", "insertCellLeftOf", "insertCellRightOf", "insertCellLeftInline", "insertCellRightInline", "clearHover"]);
    return computeCurrentDropPosition({
        clear,
        above,
        below,
        leftOf,
        rightOf,
        inlineLeft,
        inlineRight,
    }, 
    // tslint:disable-next-line:no-any
    hover, drag, monitor, component, matrixName);
};
export const computeAndDispatchHover = (_a, drag, monitor, component, matrixName = '10x10') => {
    var { cellHoverAbove: above, cellHoverBelow: below, cellHoverLeftOf: leftOf, cellHoverRightOf: rightOf, cellHoverInlineLeft: inlineLeft, cellHoverInlineRight: inlineRight, clearHover: clear } = _a, hover = __rest(_a, ["cellHoverAbove", "cellHoverBelow", "cellHoverLeftOf", "cellHoverRightOf", "cellHoverInlineLeft", "cellHoverInlineRight", "clearHover"]);
    return computeCurrentDropPosition({
        clear,
        above,
        below,
        leftOf,
        rightOf,
        inlineLeft,
        inlineRight,
    }, 
    // tslint:disable-next-line:no-any
    hover, drag, monitor, component, matrixName);
};
//# sourceMappingURL=input.js.map