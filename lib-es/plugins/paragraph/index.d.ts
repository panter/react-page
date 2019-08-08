import Plugin from '../Plugin';
import { RenderNodeProps } from 'slate-react';
import { Editor } from 'slate';
import { NextType } from '../../types/next';
import { SlatePluginSettings } from '../../types/plugin';
export declare const P = "PARAGRAPH/PARAGRAPH";
export default class ParagraphPlugin extends Plugin {
    name: string;
    constructor(props?: SlatePluginSettings);
    deserialize: (el: any, next: any) => {
        object: string;
        type: string;
        nodes: any;
    };
    serialize: (object: {
        type: string;
        object: string;
        data: any;
    }, children: any) => JSX.Element;
    renderNode: (props: RenderNodeProps, editor: Editor, next: NextType) => any;
}
//# sourceMappingURL=index.d.ts.map