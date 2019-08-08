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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_throttle_1 = __importDefault(require("lodash.throttle"));
var input_1 = require("../../../service/hover/input");
var throttle_1 = require("../../../helper/throttle");
var logger_1 = __importDefault(require("../../../service/logger"));
var nativeDragHelpers_1 = require("../../../helper/nativeDragHelpers");
var last = {
    hover: '',
    drag: '',
};
var clear = function (hover, drag) {
    if (hover.id === last.hover && drag === last.drag) {
        return;
    }
    last = { hover: hover.id, drag: drag };
    hover.clearHover(drag);
};
exports.target = {
    hover: lodash_throttle_1.default(function (hover, monitor, component) {
        // tslint:disable-next-line:no-any
        var drag = monitor.getItem();
        if (!drag) {
            // item undefined, happens when throttle triggers after drop
            return;
        }
        if (nativeDragHelpers_1.isNativeHTMLElementDrag(monitor)) {
            drag = nativeDragHelpers_1.createNativeCellReplacement();
        }
        if (!drag) {
            return;
        }
        else if (drag.id === hover.id) {
            clear(hover, drag.id);
            return;
        }
        else if (!monitor.isOver({ shallow: true })) {
            return;
        }
        else if (hover.ancestors.indexOf(drag.id) > -1) {
            // If hovering over a child of itself
            clear(hover, drag.id);
            return;
        }
        else if (!hover.id) {
            // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
            logger_1.default.warn('Canceled cell.drop.target.hover: no id given.', hover, drag);
            return;
        }
        input_1.computeAndDispatchHover(
        // tslint:disable-next-line:no-any
        hover, drag, monitor, component, '10x10-no-inline');
    }, throttle_1.delay, { leading: false }),
    canDrop: function (_a, monitor) {
        var id = _a.id, ancestors = _a.ancestors;
        var item = monitor.getItem();
        return item.id !== id || ancestors.indexOf(item.id) === -1;
    },
    // tslint:disable-next-line:no-any
    drop: function (hover, monitor, component) {
        var drag = monitor.getItem();
        if (nativeDragHelpers_1.isNativeHTMLElementDrag(monitor)) {
            var plugins = component.props.config.plugins;
            drag = plugins.createNativePlugin(hover, monitor, component);
        }
        if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
            // If the item drop occurred deeper down the tree, don't do anything
            return;
        }
        else if (hover.ancestors.indexOf(drag.id) > -1) {
            // If hovering over a child of itself
            hover.cancelCellDrag(drag.id);
            return;
        }
        else if (drag.id === hover.id) {
            hover.cancelCellDrag(drag.id);
            return;
        }
        input_1.computeAndDispatchInsert(
        // tslint:disable-next-line:no-any
        hover, drag, monitor, component, '10x10-no-inline');
    },
};
exports.connect = function (_connect, monitor) { return ({
    connectDropTarget: _connect.dropTarget(),
    isOverCurrent: monitor.isOver({ shallow: true }),
}); };
//# sourceMappingURL=dnd.js.map