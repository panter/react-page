/**
 * Sum up cell sizes: Σ(cell[size]).
 */
export declare const sumSizes: (cells?: import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>[]) => number;
/**
 * Updates each cell's size boundaries.
 */
export declare const computeBounds: (cells?: import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>[]) => import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>[];
/**
 * Computes if a cell is resizable.
 */
export declare const computeResizeable: (cells?: import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>[]) => import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>[];
/**
 * Computes sizes an inline element was found.
 */
export declare const computeInlines: (cells?: import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>[]) => import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>[];
/**
 * Resize cells.
 */
export declare const resizeCells: (cells: import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>[], { id, size }: import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>) => import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>[];
/**
 * Balance cell sizes.
 *
 * @param {[...cell]} cells
 * @return {[...cell]}
 */
export declare const computeSizes: (cells?: import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>[]) => import("../../../types/editable").AbstractCell<import("../../../types/editable").Row>[];
//# sourceMappingURL=sizing.d.ts.map