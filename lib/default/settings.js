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
exports.defaultTranslations = {
    pluginName: 'Image',
    pluginDescription: 'Loads an image from an url.',
    or: 'OR',
    haveUrl: 'I have a URL',
    imageUrl: 'Image URL',
    hrefPlaceholder: 'http://example.com',
    hrefLabel: 'Link location (url)',
    openNewWindow: 'Open in new window',
    srcPlaceholder: 'http://example.com/image.png',
};
exports.defaultSettings = {
    Controls: function () { return React.createElement(React.Fragment, null, " Controls for this plugin were not provided"); },
    Renderer: function () { return React.createElement(React.Fragment, null, "Renderer; for this plugin was not provided "); },
    translations: exports.defaultTranslations,
};
//# sourceMappingURL=settings.js.map