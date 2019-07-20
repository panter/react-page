import * as React from 'react';
import Plugin, { PluginButtonProps } from './Plugin';
import { Editor } from 'slate';
import { RenderNodeProps } from 'slate-react';
import { SlatePluginSettings } from './../types/plugin';
import { NextType } from '../types/next';
export declare const BLOCKQUOTE = "BLOCKQUOTE/BLOCKQUOTE";
export interface BlockquotePluginSettings extends SlatePluginSettings {
    DEFAULT_NODE?: string;
}
export default class BlockquotePlugin extends Plugin {
    name: string;
    plugins: {
        onKeyDown: (event: Event, editor: Editor, next: import("@guestbell/slate-common/lib/types/next").NextType) => boolean;
        schema: Object;
        utils: {
            isSelectionInBlockquote: (value: import("slate").Value) => boolean;
        };
        changes: {
            wrapInBlockquote: (editor: Editor) => Editor;
            unwrapBlockquote: (_editor: Editor) => Editor;
        };
    }[];
    constructor(props?: BlockquotePluginSettings);
    Button: React.SFC<PluginButtonProps>;
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
//# sourceMappingURL=blockquote.d.ts.map