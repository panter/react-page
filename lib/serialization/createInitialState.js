"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slate_1 = require("slate");
var paragraph_1 = require("../plugins/paragraph");
exports.default = (function () { return ({
    editorState: slate_1.Value.fromJSON({
        document: {
            nodes: [
                {
                    object: 'block',
                    type: paragraph_1.P,
                    nodes: [
                        {
                            object: 'text',
                            leaves: [
                                {
                                    text: '',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    }),
}); });
//# sourceMappingURL=createInitialState.js.map