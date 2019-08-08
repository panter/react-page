import { ComponetizedCell } from '../../../../types/editable';
export declare const source: {
    beginDrag(props: ComponetizedCell): {
        children: any;
        node: {
            rows: import("../../../../types/editable").Row[];
            id: string;
            content?: import("../../../../types/editable").Content<any>;
            layout?: import("../../../../types/editable").Layout<any>;
            size?: number;
            hover?: string;
            inline?: string;
            focused?: boolean;
            focusSource?: string;
            resizable?: boolean;
            bounds?: {
                left: number;
                right: number;
            };
            hasInlineNeighbour?: string;
            levels?: import("../../../../types/editable").Levels;
        };
        id: string;
        editable: string;
        ancestors: string[];
        config: import("../../../../types/editable").Config;
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
        styles: import("react").CSSProperties;
        rawNode(): import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>;
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
        cellHoverAbove(drag: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>, hover: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>, level: number): void;
        cellHoverBelow(drag: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>, hover: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>, level: number): void;
        cellHoverLeftOf(drag: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>, hover: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>, level: number): void;
        cellHoverRightOf(drag: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>, hover: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>, level: number): void;
        cellHoverInlineLeft(drag: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>, hover: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>): void;
        cellHoverInlineRight(drag: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>, hover: import("../../../../types/editable").AbstractCell<import("../../../../types/editable").Row>): void;
        insertCellAbove(type: string): void;
        insertCellBelow(type: string): void;
        insertCellLeftInline(type: string): void;
        insertCellLeftOf(type: string): void;
        insertCellRightInline(type: string): void;
        insertCellRightOf(type: string): void;
        onChange(state: Object): void;
    };
    endDrag({ cancelCellDrag, id }: ComponetizedCell, monitor: any): void;
};
export declare const collect: (connect: any, monitor: any) => {
    connectDragSource: any;
    isDragging: any;
    connectDragPreview: any;
};
//# sourceMappingURL=dnd.d.ts.map