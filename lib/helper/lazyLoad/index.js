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
// we wrap the suspense directly atm
// tslint:disable-next-line:no-any
var withSuspense = function (C) { return function (props) { return (React.createElement(React.Suspense, { fallback: React.createElement("div", null) },
    React.createElement(C, __assign({}, props)))); }; };
// tslint:disable-next-line:no-any
exports.default = (function (loader) { return withSuspense(React.lazy(loader)); });
//# sourceMappingURL=index.js.map