"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.defaultTranslations = {
    pluginName: 'Divider',
    pluginDescription: 'A horizontal divider',
};
exports.defaultSettings = {
    translations: exports.defaultTranslations,
    Controls: function () { return react_1.default.createElement(react_1.default.Fragment, null, "Controls for this plugin were not provided"); },
    Renderer: function () { return react_1.default.createElement(react_1.default.Fragment, null, "Renderer for this plugin was not provided"); },
};
//# sourceMappingURL=settings.js.map