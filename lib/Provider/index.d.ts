import * as React from 'react';
import { Editor } from '@react-page/core/lib';
export interface ProviderProps {
    editor: Editor;
}
declare class Provider extends React.Component<ProviderProps> {
    private DragDropContext;
    constructor(props: ProviderProps);
    render(): JSX.Element;
}
export default Provider;
//# sourceMappingURL=index.d.ts.map