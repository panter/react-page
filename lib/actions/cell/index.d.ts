export declare const cellActions: {
    createFallbackCell: (fallback: any, editable: string) => import("./core").CreateFallbackCellAction;
    blurAllCells: () => import("./core").BlurAllCellsAction;
    blurCell: (id: string) => () => import("./core").BlurCellAction;
    focusPreviousCell: (id: string) => () => import("./core").FocusPreviousCellAction;
    focusNextCell: (id: string) => () => import("./core").FocusNextCellAction;
    focusCell: (id: string) => ({ source, }?: {
        source?: string;
    }) => import("./core").FocusCellAction;
    resizeCell: (id: string) => (size?: number) => import("./core").ResizeCellAction;
    removeCell: (id: string, ids?: string[]) => import("./core").RemoveCellAction;
    updateCellLayout: (id: string) => (state?: import("../../types/editor").EditorState) => import("./core").UpdateCellLayoutAction;
    updateCellContent: (id: string) => (state?: import("../../types/editor").EditorState) => import("./core").UpdateCellContentAction;
    insertCellRightInline: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => import("./insert").InsertAction;
    insertCellLeftInline: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => import("./insert").InsertAction;
    insertCellLeftOf: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => import("./insert").InsertAction;
    insertCellRightOf: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => import("./insert").InsertAction;
    insertCellAbove: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => import("./insert").InsertAction;
    insertCellBelow: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => import("./insert").InsertAction;
    insert: (type: string) => (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => import("./insert").InsertAction;
    cancelCellDrag: () => import("./drag").CancelCellDragAction;
    clearHover: () => import("./drag").ClearHoverAction;
    dragCell: (id: string) => import("./drag").DragCellAction;
    cellHoverInlineRight: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>) => import("./drag").CellHoverAction;
    cellHoverInlineLeft: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>) => import("./drag").CellHoverAction;
    cellHoverBelow: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, level: number) => import("./drag").CellHoverAction;
    cellHoverAbove: (drag: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, hover: import("../../types/editable").AbstractCell<import("../../types/editable").Row>, level: number) => import("./drag").CellHoverAction;
    cellHoverRightOf: (drag: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, hover: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level: number) => import("./drag").CellHoverAction;
    cellHoverLeftOf: (drag: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, hover: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level: number) => import("./drag").CellHoverAction;
    cellHover: ({ id: drag }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level: number, position: import("../../const").PositionEnum) => import("./drag").CellHoverAction;
};
export * from './insert';
export * from './core';
export * from './drag';
//# sourceMappingURL=index.d.ts.map