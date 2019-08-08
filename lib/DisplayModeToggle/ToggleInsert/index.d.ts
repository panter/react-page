import * as React from 'react';
export interface InnerReduxProps {
    isInsertMode: boolean;
}
export interface InnerActionProps {
    insertMode: React.MouseEventHandler<HTMLElement>;
}
interface OwnProps {
    label: string;
}
export declare type InnerProps = InnerReduxProps & InnerActionProps & OwnProps;
declare const _default: import("react-redux").ConnectedComponentClass<React.FunctionComponent<InnerProps>, Pick<InnerProps, "label">>;
export default _default;
//# sourceMappingURL=index.d.ts.map