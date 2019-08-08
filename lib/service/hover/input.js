"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = require("react-dom");
var hover_1 = __importDefault(require("../hover"));
var hoverService = new hover_1.default();
exports.computeCurrentDropPosition = function (actions, hover, drag, monitor, component, matrixName) {
    var mousePosition = monitor.getClientOffset();
    /* eslint-disable react/no-find-dom-node */
    var componentPosition = react_dom_1.findDOMNode(component).getBoundingClientRect();
    var room = {
        height: componentPosition.bottom - componentPosition.top,
        width: componentPosition.right - componentPosition.left,
    };
    var mouse = {
        y: mousePosition.y - componentPosition.top,
        x: mousePosition.x - componentPosition.left,
    };
    hoverService.hover(drag, hover, actions, { room: room, mouse: mouse, matrix: matrixName });
};
exports.computeAndDispatchInsert = function (_a, drag, monitor, component, matrixName) {
    if (matrixName === void 0) { matrixName = '10x10'; }
    var above = _a.insertCellAbove, below = _a.insertCellBelow, leftOf = _a.insertCellLeftOf, rightOf = _a.insertCellRightOf, inlineLeft = _a.insertCellLeftInline, inlineRight = _a.insertCellRightInline, clear = _a.clearHover, hover = __rest(_a, ["insertCellAbove", "insertCellBelow", "insertCellLeftOf", "insertCellRightOf", "insertCellLeftInline", "insertCellRightInline", "clearHover"]);
    return exports.computeCurrentDropPosition({
        clear: clear,
        above: above,
        below: below,
        leftOf: leftOf,
        rightOf: rightOf,
        inlineLeft: inlineLeft,
        inlineRight: inlineRight,
    }, 
    // tslint:disable-next-line:no-any
    hover, drag, monitor, component, matrixName);
};
exports.computeAndDispatchHover = function (_a, drag, monitor, component, matrixName) {
    if (matrixName === void 0) { matrixName = '10x10'; }
    var above = _a.cellHoverAbove, below = _a.cellHoverBelow, leftOf = _a.cellHoverLeftOf, rightOf = _a.cellHoverRightOf, inlineLeft = _a.cellHoverInlineLeft, inlineRight = _a.cellHoverInlineRight, clear = _a.clearHover, hover = __rest(_a, ["cellHoverAbove", "cellHoverBelow", "cellHoverLeftOf", "cellHoverRightOf", "cellHoverInlineLeft", "cellHoverInlineRight", "clearHover"]);
    return exports.computeCurrentDropPosition({
        clear: clear,
        above: above,
        below: below,
        leftOf: leftOf,
        rightOf: rightOf,
        inlineLeft: inlineLeft,
        inlineRight: inlineRight,
    }, 
    // tslint:disable-next-line:no-any
    hover, drag, monitor, component, matrixName);
};
//# sourceMappingURL=input.js.map