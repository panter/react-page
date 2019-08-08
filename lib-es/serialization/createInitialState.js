import { Value } from 'slate';
import { P } from '../plugins/paragraph';
export default () => ({
    editorState: Value.fromJSON({
        document: {
            nodes: [
                {
                    object: 'block',
                    type: P,
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
});
//# sourceMappingURL=createInitialState.js.map