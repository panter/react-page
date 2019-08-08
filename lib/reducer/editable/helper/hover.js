"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check if this item is currently being hovered.
 */
exports.isHoveringThis = function (state, action) {
    if (state === void 0) { state = {}; }
    var _a = action.level, level = _a === void 0 ? 0 : _a, _b = action.hover, hover = _b === void 0 ? null : _b;
    var children = state.rows || state.cells || [];
    if (level > 0) {
        return Boolean(children.find(function (child) {
            return exports.isHoveringThis(child, __assign({}, action, { level: level - 1 }));
        }));
    }
    return hover === state.id;
};
//# sourceMappingURL=hover.js.map