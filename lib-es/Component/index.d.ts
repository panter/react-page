import * as React from 'react';
import { SpacerProps } from './../types/component';
export interface SpacerState {
    height: number;
}
declare class Spacer extends React.PureComponent<SpacerProps, SpacerState> {
    constructor(props: SpacerProps);
    render(): JSX.Element;
    private changeHeightPreview;
    private commitHeight;
}
export default Spacer;
//# sourceMappingURL=index.d.ts.map