import * as React from 'react';
import { Data, Editor } from 'slate';
import Plugin, { PluginButtonProps } from '../Plugin';
import { SlatePluginSettings } from './../../types/plugin';
import { RenderMarkProps, RenderNodeProps } from 'slate-react';
import { NextType } from '../../types/next';
export interface BlockquotePluginSettings extends SlatePluginSettings {
    DEFAULT_NODE?: string;
}
export declare const CODE = "CODE/CODE";
export default class CodePlugin extends Plugin {
    name: string;
    constructor(props?: BlockquotePluginSettings);
    createButton: (type: string, icon: JSX.Element) => React.FunctionComponent<PluginButtonProps>;
    createNodeButton: (type: string, icon: JSX.Element) => React.SFC<PluginButtonProps>;
    deserialize: (el: any, next: any) => {
        object: string;
        type: string;
        data: Data;
        nodes: any;
    } | {
        object: string;
        type: string;
        nodes: any;
        data?: undefined;
    };
    serialize: (object: {
        type: string;
        object: "block" | "mark";
        data: any;
    }, children: any[]) => JSX.Element;
    renderMark: (props: RenderMarkProps, editor: Editor, next: NextType) => any;
    renderNode: (props: RenderNodeProps, editor: Editor, next: NextType) => any;
}
//# sourceMappingURL=index.d.ts.map