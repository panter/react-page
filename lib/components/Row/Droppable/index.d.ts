import * as React from 'react';
import { ComponetizedRow } from '../../../types/editable';
export declare type Props = ComponetizedRow & {
    children: React.ReactChildren;
    isLayoutMode: boolean;
    isInsertMode: boolean;
    isOverCurrent: boolean;
    connectDropTarget<T>(e: T): T;
};
export declare class Droppable extends React.Component<Props> {
    render(): JSX.Element;
}
declare const _default: (dropTypes?: string[]) => any;
export default _default;
//# sourceMappingURL=index.d.ts.map