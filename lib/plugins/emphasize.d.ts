import * as React from 'react';
import Plugin, { PluginButtonProps } from './Plugin';
import { RenderMarkProps } from 'slate-react';
import { Editor } from 'slate';
import { NextType } from '../types/next';
import { SlatePluginSettings } from '../types/plugin';
export declare const STRONG = "EMPHASIZE/STRONG";
export declare const EM = "EMPHASIZE/EM";
export declare const U = "EMPHASIZE/U";
export default class EmphasizePlugin extends Plugin {
    name: string;
    hoverButtons: React.FunctionComponent<PluginButtonProps>[];
    constructor(props?: SlatePluginSettings);
    onKeyDown: (e: KeyboardEvent, editor: Editor, next: NextType) => boolean;
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
    renderMark: (props: RenderMarkProps, editor: Editor, next: NextType) => any;
}
//# sourceMappingURL=emphasize.d.ts.map