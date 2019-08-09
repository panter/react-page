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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
// tslint:disable-next-line:no-any
exports.default = (function (props) {
    var Controls = props.Controls, Renderer = props.Renderer, readOnly = props.readOnly;
    // slate controls currently contain everything
    return React.createElement(React.Fragment, null, !readOnly ? React.createElement(Controls, __assign({}, props)) : React.createElement(Renderer, __assign({}, props)));
});
//# sourceMappingURL=index.js.map