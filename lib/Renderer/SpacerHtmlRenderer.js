"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var state_1 = require("./../default/state");
var SpacerHtmlRenderer = function (_a) {
    var _b = _a.state, height = (_b === void 0 ? state_1.defaultSpacerState : _b).height;
    return React.createElement("div", { style: { height: (height || 0).toString() + "px" } });
};
exports.default = SpacerHtmlRenderer;
//# sourceMappingURL=SpacerHtmlRenderer.js.map