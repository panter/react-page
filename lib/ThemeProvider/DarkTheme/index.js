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
var styles_1 = require("@material-ui/core/styles");
var themeOptions_1 = require("../themeOptions");
var theme = styles_1.createMuiTheme(__assign({}, themeOptions_1.themeOptions, { palette: __assign({}, (themeOptions_1.themeOptions && themeOptions_1.themeOptions.palette), { type: 'dark' }), typography: {
        useNextVariants: true,
    } }));
exports.default = theme;
//# sourceMappingURL=index.js.map