import * as React from 'react';
import { ContentPlugin, LayoutPlugin, ContentPluginProps, NativePluginConfig, ContentPluginConfig, LayoutPluginConfig } from '../service/plugin/classes';
import { PluginService } from '../index';
export declare type Config = {
    whitelist: Array<string>;
    plugins: PluginService;
};
export interface Content<StateT = any> {
    plugin: ContentPluginConfig;
    state: StateT;
}
export interface Layout<StateT = any> {
    plugin: LayoutPluginConfig;
    state: StateT;
}
export declare type AbstractCell<T> = {
    id: string;
    rows?: T[];
    content?: Content;
    layout?: Layout;
    size?: number;
    hover?: string;
    inline?: string | null;
    focused?: boolean;
    focusSource?: string;
    resizable?: boolean;
    bounds?: {
        left: number;
        right: number;
    };
    hasInlineNeighbour?: string;
    levels?: Levels;
};
export declare type Cell = AbstractCell<Row>;
export declare const createCell: () => AbstractCell<Row>;
export declare type ComponetizedCell = {
    id: string;
    editable: string;
    ancestors: Array<string>;
    config: Config;
    children?: React.ReactChildren;
    node: AbstractCell<string>;
    isInsertMode: boolean;
    isResizeMode: boolean;
    isDisplayMode: boolean;
    isEditMode: boolean;
    isLayoutMode: boolean;
    isPreviewMode: boolean;
    steps: number;
    rowHeight: number;
    rowWidth: number;
    updateDimensions: Function;
    onResize: Function;
    styles: React.CSSProperties;
    rawNode(): Cell;
    clearHover(): void;
    removeCell(): void;
    resizeCell(id: string): void;
    focusCell(props: {
        source?: string;
    }): void;
    blurCell(id: string): void;
    blurAllCells(): void;
    updateCellContent(state: Object): void;
    updateCellLayout(state: Object): void;
    cancelCellDrag(): void;
    dragCell(drag: string): void;
    cellHoverAbove(drag: Cell, hover: Cell, level: number): void;
    cellHoverBelow(drag: Cell, hover: Cell, level: number): void;
    cellHoverLeftOf(drag: Cell, hover: Cell, level: number): void;
    cellHoverRightOf(drag: Cell, hover: Cell, level: number): void;
    cellHoverInlineLeft(drag: Cell, hover: Cell): void;
    cellHoverInlineRight(drag: Cell, hover: Cell): void;
    insertCellAbove(type: string): void;
    insertCellBelow(type: string): void;
    insertCellLeftInline(type: string): void;
    insertCellLeftOf(type: string): void;
    insertCellRightInline(type: string): void;
    insertCellRightOf(type: string): void;
    onChange(state: Object): void;
};
export declare type Levels = {
    left: number;
    right: number;
    above: number;
    below: number;
};
export declare type Row = {
    id: string;
    hover?: string;
    cells?: Cell[];
    hasInlineChildren?: boolean;
    levels?: Levels;
    className?: string;
};
export declare type RowComponetized = {
    id: string;
    hover?: string;
    cells: Array<string>;
    hasInlineChildren: boolean;
    inline: boolean;
};
export declare const createRow: () => Row;
export declare type ComponetizedRow = {
    id: string;
    config: Config;
    editable: string;
    ancestors: Array<string>;
    containerWidth: number;
    containerHeight: number;
    node: RowComponetized;
    isInsertMode: boolean;
    isResizeMode: boolean;
    isDisplayMode: boolean;
    isEditMode: boolean;
    isLayoutMode: boolean;
    isPreviewMode: boolean;
    clearHover(drag: string): void;
    cancelCellDrag(id: string): void;
    blurAllCells(): void;
};
export declare type AbstractEditable<T> = {
    id: string;
    config?: Config;
    cells: Array<T>;
    cellOrder?: Array<{
        id: string;
        isLeaf: boolean;
    }>;
};
export declare type EditableType = AbstractEditable<Cell>;
export declare type EditableComponentState = {
    id: string;
    node: AbstractEditable<string>;
    containerHeight: number;
    containerWidth: number;
    isInsertMode: boolean;
    isResizeMode: boolean;
    isDisplayMode: boolean;
    isEditMode: boolean;
    isLayoutMode: boolean;
    isPreviewMode: boolean;
    defaultPlugin: ContentPluginProps;
    blurAllCells(): void;
    createFallbackCell(plugin: ContentPlugin | LayoutPlugin, id: string): void;
};
export declare type Editables = {
    past: EditableType[];
    present: EditableType[];
    future: EditableType[];
};
export declare type NativeFactory = (hover?: any, monitor?: any, component?: any) => NativePluginConfig;
//# sourceMappingURL=editable.d.ts.map