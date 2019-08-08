"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var slate_html_serializer_1 = __importDefault(require("slate-html-serializer"));
var react_1 = __importDefault(require("react"));
var parse5_1 = __importDefault(require("parse5"));
var slate_1 = require("slate");
var createInitialState_1 = __importDefault(require("./createInitialState"));
exports.default = (function (_a) {
    var plugins = _a.plugins;
    var lineBreakSerializer = {
        // tslint:disable-next-line:no-any
        deserialize: function (el) {
            if (el.tagName.toLowerCase() === 'br') {
                return { object: 'text', text: '\n' };
            }
            if (el.nodeName === '#text') {
                if (el.value && el.value.match(/<!--.*?-->/)) {
                    return;
                }
                return {
                    object: 'text',
                    leaves: [
                        {
                            object: 'leaf',
                            text: el.value,
                        },
                    ],
                };
            }
        },
        // tslint:disable-next-line:no-any
        serialize: function (object, children) {
            if (object.type === 'text' || children === '\n') {
                return react_1.default.createElement("br", null);
            }
        },
    };
    var html = new slate_html_serializer_1.default({
        rules: plugins.concat([lineBreakSerializer]),
        parseHtml: parse5_1.default.parseFragment,
    });
    var htmlToSlate = function (htmlString) { return html.deserialize(htmlString); };
    var slateToHtml = function (editorState) { return html.serialize(editorState); };
    var unserialize = function (_a) {
        var importFromHtml = _a.importFromHtml, serialized = _a.serialized, editorState = _a.editorState;
        if (serialized) {
            // tslint:disable-next-line:no-any
            return { editorState: slate_1.Value.fromJSON(serialized) };
        }
        else if (importFromHtml) {
            return { editorState: htmlToSlate(importFromHtml) };
        }
        else if (editorState) {
            return { editorState: editorState };
        }
        return createInitialState_1.default();
    };
    // tslint:disable-next-line:no-any
    var serialize = function (_a) {
        var editorState = _a.editorState;
        return ({
            // tslint:disable-next-line:no-any
            serialized: editorState.toJSON(editorState),
        });
    };
    return {
        serialize: serialize,
        unserialize: unserialize,
        slateToHtml: slateToHtml,
        htmlToSlate: htmlToSlate,
    };
});
//# sourceMappingURL=index.js.map