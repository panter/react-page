"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_throttle_1 = __importDefault(require("lodash.throttle"));
var pathOr_1 = __importDefault(require("ramda/src/pathOr"));
var input_1 = require("../../../../service/hover/input");
var throttle_1 = require("../../../../helper/throttle");
var logger_1 = __importDefault(require("../../../../service/logger"));
var nativeDragHelpers_1 = require("../../../../helper/nativeDragHelpers");
var last = { hover: '', drag: '' };
var clear = function (hover, drag) {
    if (hover.id === last.hover && drag === last.drag) {
        return;
    }
    last = { hover: hover.id, drag: drag };
    hover.clearHover();
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
        if (drag.id === hover.id) {
            // If hovering over itself, do nothing
            clear(hover, drag.id);
            return;
        }
        else if (!monitor.isOver({ shallow: true })) {
            // If hovering over ancestor cell, do nothing (we are going to propagate later in the tree anyways)
            return;
        }
        else if (hover.ancestors.indexOf(drag.id) > -1) {
            // If hovering over a child of itself
            clear(hover, drag.id);
            return;
        }
        else if (!hover.id) {
            // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
            logger_1.default.warn('Canceled cell drop, no id given.', hover, drag);
            return;
        }
        last = { hover: hover.id, drag: drag.id };
        var allowInlineNeighbours = pathOr_1.default(false, ['node', 'content', 'plugin', 'allowInlineNeighbours'], hover);
        input_1.computeAndDispatchHover(hover, drag, monitor, component, "10x10" + (allowInlineNeighbours ? '' : '-no-inline'));
    }, throttle_1.delay, { leading: false }),
    canDrop: function (_a, monitor) {
        var id = _a.id, ancestors = _a.ancestors;
        var item = monitor.getItem();
        return item.id !== id && ancestors.indexOf(item.id) === -1;
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
        else if (drag.id === hover.id) {
            // If the item being dropped on itself do nothing
            hover.cancelCellDrag();
            return;
        }
        else if (hover.ancestors.indexOf(drag.id) > -1) {
            // If hovering over a child of itself, don't propagate further
            hover.cancelCellDrag();
            return;
        }
        last = { hover: hover.id, drag: drag.id };
        var allowInlineNeighbours = pathOr_1.default(false, ['node', 'content', 'plugin', 'allowInlineNeighbours'], hover);
        input_1.computeAndDispatchInsert(hover, drag, monitor, component, "10x10" + (allowInlineNeighbours ? '' : '-no-inline'));
    },
};
exports.connect = function (connectInner, monitor) { return ({
    connectDropTarget: connectInner.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
}); };
//# sourceMappingURL=dnd.js.map