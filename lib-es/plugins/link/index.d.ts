import Plugin from '../Plugin';
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
export default class LinkPlugin extends Plugin {
    name: string;
    hoverButtons: ((props: any) => JSX.Element)[];
    toolbarButtons: ((props: any) => JSX.Element)[];
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
//# sourceMappingURL=index.d.ts.map