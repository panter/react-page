export declare const actions: (dispatch: any) => {
    cell: {
        updateContent: (id: string, state: {}) => any;
        updateLayout: (id: string, state: {}) => any;
        remove: (id: string, ids?: string[]) => import("./cell/core").RemoveCellAction;
        resize: (id: string, size: number) => any;
        focus: (id: string, source: {}) => any;
        focusNext: (id: string) => any;
        focusPrevious: (id: string) => any;
        blurAll: () => import("./cell/core").BlurAllCellsAction;
        drag: (id: string) => import("./cell/drag").DragCellAction;
        cancelDrag: () => import("./cell/drag").CancelCellDragAction;
        hoverLeftOf: (drag: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, hover: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, level: number) => import("./cell/drag").CellHoverAction;
        hoverRightOf: (drag: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, hover: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, level: number) => import("./cell/drag").CellHoverAction;
        hoverAbove: (drag: import("../types/editable").AbstractCell<import("../types/editable").Row>, hover: import("../types/editable").AbstractCell<import("../types/editable").Row>, level: number) => import("./cell/drag").CellHoverAction;
        hoverBelow: (drag: import("../types/editable").AbstractCell<import("../types/editable").Row>, hover: import("../types/editable").AbstractCell<import("../types/editable").Row>, level: number) => import("./cell/drag").CellHoverAction;
        hoverFloatingLeft: (drag: import("../types/editable").AbstractCell<import("../types/editable").Row>, hover: import("../types/editable").AbstractCell<import("../types/editable").Row>) => import("./cell/drag").CellHoverAction;
        hoverFloatingRight: (drag: import("../types/editable").AbstractCell<import("../types/editable").Row>, hover: import("../types/editable").AbstractCell<import("../types/editable").Row>) => import("./cell/drag").CellHoverAction;
        clearHover: () => import("./cell/drag").ClearHoverAction;
        insertBelow: (item: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, level?: number, ids?: string[]) => import("./cell/insert").InsertAction;
        insertAbove: (item: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, level?: number, ids?: string[]) => import("./cell/insert").InsertAction;
        insertRightOf: (item: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, level?: number, ids?: string[]) => import("./cell/insert").InsertAction;
        insertLeftOf: (item: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, level?: number, ids?: string[]) => import("./cell/insert").InsertAction;
        insertFloatingLeft: (item: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, level?: number, ids?: string[]) => import("./cell/insert").InsertAction;
        insertFloatingRight: (item: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../types/editable").AbstractCell<import("../types/editable").Row>>, level?: number, ids?: string[]) => import("./cell/insert").InsertAction;
    };
    editable: {
        add: (editable: import("../types/editable").AbstractEditable<import("../types/editable").AbstractCell<import("../types/editable").Row>>) => import("./editables").UpdateEditableAction;
        update: (editable: import("../types/editable").AbstractEditable<import("../types/editable").AbstractCell<import("../types/editable").Row>>) => import("./editables").UpdateEditableAction;
    };
    mode: {
        insert: () => import("./display").SetDisplayModeAction;
        edit: () => import("./display").SetDisplayModeAction;
        preview: () => import("./display").SetDisplayModeAction;
        layout: () => import("./display").SetDisplayModeAction;
        resize: () => import("./display").SetDisplayModeAction;
    };
    undo: () => import("redux").Action;
    redo: () => import("redux").Action;
};
declare type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
export declare type ActionsTypes = ReturnType<typeof actions>;
export {};
//# sourceMappingURL=index.d.ts.map