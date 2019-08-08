import { Cell } from '../../types/editable';
import { Action } from 'redux';
export declare const CELL_INSERT_ABOVE = "CELL_INSERT_ABOVE";
export declare const CELL_INSERT_BELOW = "CELL_INSERT_BELOW";
export declare const CELL_INSERT_LEFT_OF = "CELL_INSERT_LEFT_OF";
export declare const CELL_INSERT_RIGHT_OF = "CELL_INSERT_RIGHT_OF";
export declare const CELL_INSERT_INLINE_LEFT = "CELL_INSERT_INLINE_LEFT";
export declare const CELL_INSERT_INLINE_RIGHT = "CELL_INSERT_INLINE_RIGHT";
export interface InsertAction extends Action {
    ts: Date;
    item: Partial<Cell>;
    hover: string;
    level: number;
    ids: string[];
}
/**
 * Insert a cell below of the hovering cell.
 */
export declare const insertCellBelow: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
/**
 * Insert a cell above of the hovering cell.
 */
export declare const insertCellAbove: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
/**
 * Insert a cell right of the hovering cell.
 */
export declare const insertCellRightOf: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
/**
 * Insert a cell left of the hovering cell.
 */
export declare const insertCellLeftOf: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
/**
 * Insert a cell inside the hovering cell, on the left.
 */
export declare const insertCellLeftInline: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
/**
 * Insert a cell inside the hovering cell, on the right.
 */
export declare const insertCellRightInline: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
export declare const insertActions: {
    insertCellRightInline: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
    insertCellLeftInline: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
    insertCellLeftOf: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
    insertCellRightOf: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
    insertCellAbove: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
    insertCellBelow: (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
    insert: (type: string) => (item: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, { id: hover, inline, hasInlineNeighbour }: Partial<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>, level?: number, ids?: string[]) => InsertAction;
};
//# sourceMappingURL=insert.d.ts.map