import * as React from 'react';
import { EditorState } from '../../types/editor';
import Editor from '../../';
export declare type PropTypes = {
    id: string;
    editor: Editor;
    onChange?: Function;
};
declare class Editable extends React.PureComponent<PropTypes> {
    unsubscribe: Function;
    previousState: EditorState;
    DragDropContext: React.ComponentClass;
    constructor(props: PropTypes);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onChange: () => void;
    render(): JSX.Element;
}
export default Editable;
//# sourceMappingURL=index.d.ts.map