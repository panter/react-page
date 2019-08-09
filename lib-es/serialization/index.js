import Html from 'slate-html-serializer';
import { Value } from 'slate';
import createInitialState from './createInitialState';
const parseHtml = require('jsdom').fragment; // we exclude that on browsers through package.json's browser field
export default ({ plugins }) => {
    // tslint:disable-next-line:no-any
    const html = new Html({
        rules: plugins,
        // tslint:disable-next-line:no-any
        parseHtml,
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