import Html from 'slate-html-serializer';
import React from 'react';
import parse5 from 'parse5';
import { Value } from 'slate';
import createInitialState from './createInitialState';
export default ({ plugins }) => {
    const lineBreakSerializer = {
        // tslint:disable-next-line:no-any
        deserialize(el) {
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
        serialize(object, children) {
            if (object.type === 'text' || children === '\n') {
                return React.createElement("br", null);
            }
        },
    };
    const html = new Html({
        rules: [...plugins, lineBreakSerializer],
        parseHtml: parse5.parseFragment,
    });
    const htmlToSlate = (htmlString) => html.deserialize(htmlString);
    const slateToHtml = (editorState) => html.serialize(editorState);
    const unserialize = ({ importFromHtml, serialized, editorState, }) => {
        if (serialized) {
            // tslint:disable-next-line:no-any
            return { editorState: Value.fromJSON(serialized) };
        }
        else if (importFromHtml) {
            return { editorState: htmlToSlate(importFromHtml) };
        }
        else if (editorState) {
            return { editorState };
        }
        return createInitialState();
    };
    // tslint:disable-next-line:no-any
    const serialize = ({ editorState, }) => ({
        // tslint:disable-next-line:no-any
        serialized: editorState.toJSON(editorState),
    });
    return {
        serialize,
        unserialize,
        slateToHtml,
        htmlToSlate,
    };
};
//# sourceMappingURL=index.js.map