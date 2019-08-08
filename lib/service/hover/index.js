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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var deep_equal_1 = __importDefault(require("deep-equal"));
var logger_1 = __importDefault(require("../logger"));
/**
 * NO (None): No drop zone.
 *
 * Corners are counted clockwise, beginning top left
 * C1 (Corner top left): Position decided by top left corner function
 * C2 (Corner top right): Position decided by top right corner function
 * C3 (Corner bottom right): Position decided by bottom right corner function
 * C4 (Corner bottom left): Position decided by bottom left corner function
 *
 * Above:
 * AH (Above here): above, same level
 * AA (Above of self or some ancestor): Above, compute active level using classification functions, e.g. log, sin, mx + t
 *
 * Below:
 * BH (Below here)
 * BA (Below of self or some ancestor)
 *
 * Left of:
 * LH (Left of here)
 * LA (Left of self or some ancestor)
 *
 * Right of:
 * RH (Right of here)
 * RA (Right of self or some ancestor)
 *
 * Inside / inline
 * IL (Inline left)
 * IR (Inline right)
 */
exports.classes = {
    NO: 0,
    C1: 10,
    C2: 11,
    C3: 12,
    C4: 13,
    AH: 200,
    AA: 201,
    BH: 210,
    BA: 211,
    LH: 220,
    LA: 221,
    RH: 230,
    RA: 231,
    IL: 300,
    IR: 301,
};
var c = exports.classes;
/**
 * A list of matrices that are used to define the callback function.
 *
 * @type {{6x6: *[], 10x10: *[], 10x10-no-inline: *[]}}
 */
exports.defaultMatrices = {
    '6x6': [
        [c.C1, c.AA, c.AA, c.AA, c.AA, c.C2],
        [c.LA, c.IL, c.AH, c.AH, c.IR, c.RA],
        [c.LA, c.LH, c.NO, c.NO, c.RH, c.RA],
        [c.LA, c.LH, c.NO, c.NO, c.RH, c.RA],
        [c.LA, c.C4, c.BH, c.BH, c.C3, c.RA],
        [c.C4, c.BA, c.BA, c.BA, c.BA, c.C3],
    ],
    '10x10': [
        [c.C1, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.C2],
        [c.LA, c.IL, c.IL, c.IL, c.AH, c.AH, c.IR, c.IR, c.IR, c.RA],
        [c.LA, c.IL, c.IL, c.IL, c.AH, c.AH, c.IR, c.IR, c.IR, c.RA],
        [c.LA, c.IL, c.IL, c.IL, c.AH, c.AH, c.IR, c.IR, c.IR, c.RA],
        [c.LA, c.LH, c.LH, c.LH, c.C1, c.C2, c.RH, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.LH, c.C4, c.C3, c.RH, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.C4, c.BH, c.BH, c.C3, c.IR, c.RH, c.RA],
        [c.LA, c.LH, c.C4, c.BH, c.BH, c.BH, c.BH, c.C3, c.RH, c.RA],
        [c.LA, c.C4, c.BH, c.BH, c.BH, c.BH, c.BH, c.BH, c.C3, c.RA],
        [c.C4, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.C3],
    ],
    '10x10-no-inline': [
        [c.C1, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.AA, c.C2],
        [c.LA, c.C1, c.AH, c.AH, c.AH, c.AH, c.AH, c.AH, c.C2, c.RA],
        [c.LA, c.LH, c.C1, c.AH, c.AH, c.AH, c.AH, c.C2, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.C1, c.AH, c.AH, c.C2, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.LH, c.C1, c.C2, c.RH, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.LH, c.C4, c.C3, c.RH, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.LH, c.C4, c.BH, c.BH, c.C3, c.RH, c.RH, c.RA],
        [c.LA, c.LH, c.C4, c.BH, c.BH, c.BH, c.BH, c.C3, c.RH, c.RA],
        [c.LA, c.C4, c.BH, c.BH, c.BH, c.BH, c.BH, c.BH, c.C3, c.RA],
        [c.C4, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.BA, c.C3],
    ],
};
/**
 * Computes the average width and height for cells in a room.
 *
 * @param room
 * @param matrix
 * @returns {{x: number, y: number}}
 */
exports.getRoomScale = function (_a) {
    var room = _a.room, matrix = _a.matrix;
    var rows = matrix.length;
    var cells = matrix[0].length;
    var scalingX = room.width / cells;
    var scalingY = room.height / rows;
    return {
        x: scalingX,
        y: scalingY,
    };
};
/**
 * Returns the index of the hover cell.
 *
 * @param mouse
 * @param scale
 */
exports.getMouseHoverCell = function (_a) {
    var mouse = _a.mouse, scale = _a.scale;
    return ({
        cell: Math.floor(mouse.x / scale.x),
        row: Math.floor(mouse.y / scale.y),
    });
};
/**
 * Used for caching.
 */
var last = { '10x10': null, '10x10-no-inline': null };
exports.computeHover = function (drag, hover, actions, _a, m
// tslint:disable-next-line:no-any
) {
    var room = _a.room, mouse = _a.mouse, matrix = _a.matrix, callbacks = _a.callbacks;
    var scale = exports.getRoomScale({ room: room, matrix: matrix });
    var hoverCell = exports.getMouseHoverCell({ mouse: mouse, scale: scale });
    var rows = matrix.length;
    var cells = matrix[0].length;
    if (hoverCell.row >= rows) {
        hoverCell.row = rows - 1;
    }
    else if (hoverCell.row < 0) {
        hoverCell.row = 0;
    }
    if (hoverCell.cell >= cells) {
        hoverCell.cell = cells - 1;
    }
    else if (hoverCell.cell < 0) {
        hoverCell.cell = 0;
    }
    var cell = matrix[hoverCell.row][hoverCell.cell];
    if (!callbacks[cell]) {
        logger_1.default.error('Matrix callback not found.', {
            room: room,
            mouse: mouse,
            matrix: matrix,
            scale: scale,
            hoverCell: hoverCell,
            rows: rows,
            cells: cells,
        });
        return;
    }
    var all = {
        item: drag.id,
        hover: hover.id,
        actions: actions,
        ctx: {
            room: room,
            mouse: mouse,
            position: hoverCell,
            size: { rows: rows, cells: cells },
            scale: scale,
        },
    };
    if (deep_equal_1.default(all, last[m])) {
        return;
    }
    last[m] = all;
    return callbacks[cell](drag, hover, actions, {
        room: room,
        mouse: mouse,
        position: hoverCell,
        size: { rows: rows, cells: cells },
        scale: scale,
    });
};
/**
 * Return the mouse position relative to the cell.
 */
exports.relativeMousePosition = function (_a) {
    var mouse = _a.mouse, position = _a.position, scale = _a.scale;
    return ({
        x: Math.round(mouse.x - position.cell * scale.x),
        y: Math.round(mouse.y - position.row * scale.y),
    });
};
/**
 * Computes the drop level based on the mouse position and the cell width.
 */
exports.computeLevel = function (_a) {
    var size = _a.size, levels = _a.levels, position = _a.position;
    if (size <= (levels + 1) * 2) {
        return Math.round(position / (size / levels));
    }
    var spare = size - (levels + 1) * 2;
    var steps = [0];
    var current = spare;
    for (var i = 0; i <= levels; i++) {
        steps.push(steps[i] + current / 2);
        current /= 2;
        if (position >= steps[i] + i * 2 && position < steps[i + 1] + (i + 1) * 2) {
            return i;
        }
    }
    return levels;
};
/**
 * Computes the horizontal drop level based on the mouse position.
 *
 * @param mouse
 * @param position
 * @param hover
 * @param scale
 * @param level
 * @param inv returns the inverse drop level. Usually true for left and above drop level computation.
 * @returns number
 */
exports.computeHorizontal = function (_a, inv) {
    var mouse = _a.mouse, position = _a.position, hover = _a.hover, scale = _a.scale, level = _a.level;
    if (inv === void 0) { inv = false; }
    var _b = hover.node.cells, cells = _b === void 0 ? [] : _b;
    var x = exports.relativeMousePosition({ mouse: mouse, position: position, scale: scale }).x;
    var at = exports.computeLevel({ size: scale.x, position: x, levels: level });
    if (cells.length) {
        // Is row, always opt for lowest level
        return level;
    }
    // If the hovered element is an inline element, level 0 would be directly besides it which doesn't work.
    // Set it to 1 instead.
    if (hover.node.inline && at === 0) {
        at = 1;
    }
    return inv ? level - at : at;
};
/**
 * Computes the vertical drop level based on the mouse position.
 *
 * @returns number
 */
exports.computeVertical = function (_a, inv) {
    var level = _a.level, mouse = _a.mouse, hover = _a.hover, position = _a.position, scale = _a.scale;
    if (inv === void 0) { inv = false; }
    var _b = hover.node.cells, cells = _b === void 0 ? [] : _b;
    var y = exports.relativeMousePosition({ mouse: mouse, position: position, scale: scale }).y;
    var at = exports.computeLevel({ size: scale.y, position: y, levels: level });
    if (cells.length) {
        // Is row, always opt for lowest level
        return level;
    }
    // If the hovered element is an inline element, level 0 would be directly besides it which doesn't work.
    // Set it to 1 instead.
    if (hover.node.inline && at === 0) {
        at = 1;
    }
    return inv ? level - at : at;
};
var getDropLevel = function (hover) { return (hover.node.inline ? 1 : 0); };
/**
 * A list of callbacks.
 */
exports.defaultCallbacks = (_a = {},
    _a[c.NO] = function (item, hover, _a) {
        var clear = _a.clear;
        return clear(item.id);
    },
    /* corners */
    _a[c.C1] = function (item, hover, _a, 
    // tslint:disable-next-line:no-any
    ctx) {
        var leftOf = _a.leftOf, above = _a.above;
        var mouse = exports.relativeMousePosition(ctx);
        var level = getDropLevel(hover);
        if (mouse.x < mouse.y) {
            return leftOf(item.rawNode(), hover.rawNode(), level);
        }
        above(item.rawNode(), hover.rawNode(), level);
    },
    _a[c.C2] = function (item, hover, _a, 
    // tslint:disable-next-line:no-any
    ctx) {
        var rightOf = _a.rightOf, above = _a.above;
        var mouse = exports.relativeMousePosition(ctx);
        var level = getDropLevel(hover);
        if (mouse.x > mouse.y) {
            return rightOf(item.rawNode(), hover.rawNode(), level);
        }
        above(item.rawNode(), hover.rawNode(), level);
    },
    _a[c.C3] = function (item, hover, _a, 
    // tslint:disable-next-line:no-any
    ctx) {
        var rightOf = _a.rightOf, below = _a.below;
        var mouse = exports.relativeMousePosition(ctx);
        var level = getDropLevel(hover);
        if (mouse.x > mouse.y) {
            return rightOf(item.rawNode(), hover.rawNode(), level);
        }
        below(item.rawNode(), hover.rawNode(), level);
    },
    _a[c.C4] = function (item, hover, _a, 
    // tslint:disable-next-line:no-any
    ctx) {
        var leftOf = _a.leftOf, below = _a.below;
        var mouse = exports.relativeMousePosition(ctx);
        var level = getDropLevel(hover);
        if (mouse.x < mouse.y) {
            return leftOf(item.rawNode(), hover.rawNode(), level);
        }
        below(item.rawNode(), hover.rawNode(), level);
    },
    /* heres */
    _a[c.AH] = function (item, hover, _a) {
        var above = _a.above;
        var level = getDropLevel(hover);
        above(item.rawNode(), __assign({}, hover.rawNode()), level);
    },
    _a[c.BH] = function (item, hover, _a) {
        var below = _a.below;
        var level = getDropLevel(hover);
        below(item.rawNode(), __assign({}, hover.rawNode()), level);
    },
    _a[c.LH] = function (item, hover, _a) {
        var leftOf = _a.leftOf;
        var level = getDropLevel(hover);
        leftOf(item.rawNode(), __assign({}, hover.rawNode()), level);
    },
    _a[c.RH] = function (item, hover, _a) {
        var rightOf = _a.rightOf;
        var level = getDropLevel(hover);
        rightOf(item.rawNode(), __assign({}, hover.rawNode()), level);
    },
    /* ancestors */
    _a[c.AA] = function (item, hover, _a, ctx) {
        var above = _a.above;
        return above(item.rawNode(), hover.rawNode(), exports.computeVertical(__assign({}, ctx, { hover: hover, level: hover.node.levels.above }), true));
    },
    _a[c.BA] = function (item, hover, _a, ctx) {
        var below = _a.below;
        return below(item.rawNode(), hover.rawNode(), exports.computeVertical(__assign({}, ctx, { hover: hover, level: hover.node.levels.below })));
    },
    _a[c.LA] = function (item, hover, _a, ctx) {
        var leftOf = _a.leftOf;
        return leftOf(item.rawNode(), hover.rawNode(), exports.computeHorizontal(__assign({}, ctx, { hover: hover, level: hover.node.levels.left }), true));
    },
    _a[c.RA] = function (item, hover, _a, ctx) {
        var rightOf = _a.rightOf;
        return rightOf(item.rawNode(), hover.rawNode(), exports.computeHorizontal(__assign({}, ctx, { hover: hover, level: hover.node.levels.right })));
    },
    /* inline */
    _a[c.IL] = function (item, hover, _a) {
        var inlineLeft = _a.inlineLeft, leftOf = _a.leftOf;
        var _b = hover.node, inline = _b.inline, hasInlineNeighbour = _b.hasInlineNeighbour;
        var _c = item.node.content, _d = (_c === void 0 ? {} : _c).plugin, _e = (_d === void 0 ? {} : _d).isInlineable, isInlineable = _e === void 0 ? false : _e;
        if (inline || !isInlineable) {
            return leftOf(item.rawNode(), hover.rawNode(), 2);
        }
        if (hasInlineNeighbour && hasInlineNeighbour !== item.id) {
            return leftOf(item.rawNode(), hover.rawNode(), 2);
        }
        if (hasInlineNeighbour &&
            hasInlineNeighbour === item.id &&
            item.node.inline === 'left') {
            return leftOf(item.rawNode(), hover.rawNode(), 2);
        }
        inlineLeft(item.rawNode(), hover.rawNode());
    },
    _a[c.IR] = function (item, hover, _a) {
        var inlineRight = _a.inlineRight, rightOf = _a.rightOf;
        var _b = hover.node, inline = _b.inline, hasInlineNeighbour = _b.hasInlineNeighbour;
        var _c = item.node.content, _d = (_c === void 0 ? {} : _c).plugin, _e = (_d === void 0 ? {} : _d).isInlineable, isInlineable = _e === void 0 ? false : _e;
        if (inline || !isInlineable) {
            return rightOf(item.rawNode(), hover.rawNode(), 2);
        }
        if (hasInlineNeighbour && hasInlineNeighbour !== item.id) {
            return rightOf(item.rawNode(), hover.rawNode(), 2);
        }
        if (hasInlineNeighbour &&
            hasInlineNeighbour === item.id &&
            item.node.inline === 'right') {
            return rightOf(item.rawNode(), hover.rawNode(), 2);
        }
        inlineRight(item.rawNode(), hover.rawNode());
    },
    _a);
/**
 * The HoverService uses callbacks and matrices to compute hover logic.
 *
 * @class HoverService
 */
var HoverService = /** @class */ (function () {
    function HoverService(_a) {
        var _b = _a === void 0 ? {} : _a, matrices = _b.matrices, callbacks = _b.callbacks;
        this.callbacks = exports.defaultCallbacks;
        this.matrices = exports.defaultMatrices;
        this.matrices = matrices || this.matrices;
        this.callbacks = callbacks || this.callbacks;
    }
    HoverService.prototype.hover = function (drag, hover, actions, _a) {
        var room = _a.room, mouse = _a.mouse, _b = _a.matrix, use = _b === void 0 ? '10x10' : _b;
        return exports.computeHover(drag, hover, actions, {
            room: room,
            mouse: mouse,
            matrix: this.matrices[use],
            callbacks: this.callbacks,
        }, use);
    };
    return HoverService;
}());
exports.default = HoverService;
//# sourceMappingURL=index.js.map