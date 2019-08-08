import { AbstractCell } from '@react-page/core/lib/types/editable';
export declare const merge: (states: Object[]) => Object;
export declare const split: (state: Object) => Object[];
export declare const handleRemoveHotKey: (_: Event, { content: { state: { editorState }, }, }: AbstractCell<string>) => Promise<void>;
export declare const handleFocusPreviousHotKey: (e: KeyboardEvent, { content: { state: { editorState }, }, }: AbstractCell<string>) => Promise<void>;
export declare const handleFocusNextHotKey: (e: KeyboardEvent, { content: { state: { editorState }, }, }: AbstractCell<string>) => Promise<void>;
//# sourceMappingURL=hooks.d.ts.map