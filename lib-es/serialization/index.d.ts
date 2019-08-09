import { SlateState } from '../types/state';
import { EditorState } from '@react-page/core/lib/types/editor';
import { PluginProps } from '@react-page/core/lib/service/plugin/classes';
declare type AdditionalSlateFunctions = {
    slateToHtml: (editorState: EditorState) => string;
    htmlToSlate: (html: string) => EditorState;
};
export declare type SerializationFunctions = Pick<PluginProps<SlateState>, 'serialize' | 'unserialize' | 'createInitialState'> & AdditionalSlateFunctions;
declare const _default: ({ plugins }: {
    plugins: any;
}) => SerializationFunctions;
export default _default;
//# sourceMappingURL=index.d.ts.map