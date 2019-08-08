import { Action } from 'redux';
export declare const SET_DISPLAY_MODE = "SET_DISPLAY_MODE";
export declare const SET_PREVIOUS_DISPLAY_MODE = "SET_PREVIOUS_DISPLAY_MODE";
export declare const DISPLAY_MODE_PREVIEW = "preview";
export declare const DISPLAY_MODE_LAYOUT = "layout";
export declare const DISPLAY_MODE_EDIT = "edit";
export declare const DISPLAY_MODE_INSERT = "insert";
export declare const DISPLAY_MODE_RESIZING = "resizing";
export declare type DisplayModes = 'preview' | 'layout' | 'edit' | 'insert' | 'resizing';
export declare const DEFAULT_DISPLAY_MODE = "preview";
export interface SetDisplayModeAction extends Action {
    ts: Date;
    mode: DisplayModes;
    remember: boolean;
}
/**
 * Dispatch to switch to insert display mode.
 */
export declare const insertMode: () => SetDisplayModeAction;
/**
 * Dispatch to switch to edit display mode.
 */
export declare const editMode: () => SetDisplayModeAction;
/**
 * Dispatch to switch to preview display mode.
 */
export declare const previewMode: () => SetDisplayModeAction;
/**
 * Dispatch to switch to layout display mode.
 */
export declare const layoutMode: () => SetDisplayModeAction;
/**
 * Dispatch to switch to resize display mode.
 */
export declare const resizeMode: () => SetDisplayModeAction;
export interface PreviousModeAction extends Action {
    fallback: DisplayModes;
}
/**
 * Dispatch to switch to the last display mode, or the fallback if reverting is not possible.
 */
export declare const previousMode: (fallback: DisplayModes) => PreviousModeAction;
//# sourceMappingURL=display.d.ts.map