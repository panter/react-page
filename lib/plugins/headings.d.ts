import * as React from 'react';
import Plugin, { PluginButtonProps } from './Plugin';
import { SlatePluginSettings } from './../types/plugin';
import { RenderNodeProps } from 'slate-react';
import { Editor } from 'slate';
import { NextType } from '../types/next';
export declare const H1 = "HEADINGS/HEADING-ONE";
export declare const H2 = "HEADINGS/HEADING-TWO";
export declare const H3 = "HEADINGS/HEADING-THREE";
export declare const H4 = "HEADINGS/HEADING-FOUR";
export declare const H5 = "HEADINGS/HEADING-FIVE";
export declare const H6 = "HEADINGS/HEADING-SIX";
export interface HeadingsPluginSettings extends SlatePluginSettings {
    DEFAULT_NODE?: string;
    allowedLevels?: number[];
}
export default class HeadingsPlugin extends Plugin {
    name: string;
    allowedLevels: number[];
    constructor(props?: HeadingsPluginSettings);
    createButton: (type: string, icon: JSX.Element) => React.SFC<PluginButtonProps>;
    deserialize: (el: any, next: any) => {
        object: string;
        type: string;
        nodes: any;
    };
    serialize: (object: {
        type: string;
        object: string;
        data: any;
    }, children: any[]) => JSX.Element;
    renderNode: (props: RenderNodeProps, editor: Editor, next: NextType) => any;
}
//# sourceMappingURL=headings.d.ts.map