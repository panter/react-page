import * as React from 'react';
import { NextType } from '../types/next';
import { Value, Editor as CoreEditor } from 'slate';
import { SlateProps } from 'src/types/component';
export interface SlateState {
    editorState?: Value;
}
declare class Slate extends React.Component<SlateProps, SlateState> {
    private toolbar;
    private editor;
    private flushStateDebounced;
    constructor(props: SlateProps);
    componentDidMount: () => void;
    flushState: () => void;
    getState(): Value;
    onStateChange: ({ value }: {
        value: Value;
    }) => void;
    updateToolbar: () => void;
    onPaste: (e: Event, editor: CoreEditor, next: NextType) => any;
    onKeyDown: (e: KeyboardEvent, editor: CoreEditor, next: NextType) => boolean;
    render(): JSX.Element;
}
export default Slate;
//# sourceMappingURL=index.d.ts.map