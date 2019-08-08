import * as React from 'react';
import { PluginButtonProps } from '../Plugin';
export interface LinkButtonState {
    open: boolean;
    href: string;
    title: string;
    hadLinks: boolean;
    wasExpanded: boolean;
}
declare class LinkButton extends React.Component<PluginButtonProps, LinkButtonState> {
    state: {
        open: boolean;
        href: string;
        title: string;
        hadLinks: boolean;
        wasExpanded: boolean;
    };
    input: HTMLDivElement;
    onRef: (component: HTMLDivElement) => any;
    onClick: (e: any) => void;
    handleClose: () => void;
    handleSubmit: () => void;
    onHrefChange: (e: any) => void;
    onTitleChange: (e: any) => void;
    render(): JSX.Element;
}
export default LinkButton;
//# sourceMappingURL=LinkButton.d.ts.map