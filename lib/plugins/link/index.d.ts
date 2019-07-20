import * as React from 'react';
import Plugin, { PluginButtonProps } from '../Plugin';
import { Data, Editor } from 'slate';
import { RenderNodeProps } from 'slate-react';
import { NextType } from '../../types/next';
import { SlatePluginSettings } from '../../types/plugin';
export declare const A = "LINK/LINK";
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
export default class LinkPlugin extends Plugin {
    name: string;
    hoverButtons: (typeof LinkButton)[];
    toolbarButtons: (typeof LinkButton)[];
    constructor(props?: SlatePluginSettings);
    deserialize: (el: any, next: any) => {
        object: string;
        type: string;
        nodes: any;
        data: Data;
    };
    serialize: (object: {
        type: string;
        object: string;
        data: any;
    }, children: any[]) => JSX.Element;
    renderNode: (props: RenderNodeProps, editor: Editor, next: NextType) => any;
}
export {};
//# sourceMappingURL=index.d.ts.map