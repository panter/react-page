import { ComponetizedCell, ComponetizedRow } from '../../types/editable';
import { Room, Matrix, Vector, MatrixIndex, Callbacks } from '../../types/hover';
export declare type MatrixList = {
    [key: string]: Matrix;
};
export declare type CallbackList = {
    [key: number]: Function;
};
/**
 * NO (None): No drop zone.
 *
 * Corners are counted clockwise, beginning top left
 * C1 (Corner top left): Position decided by top left corner function
 * C2 (Corner top right): Position decided by top right corner function
 * C3 (Corner bottom right): Position decided by bottom right corner function
 * C4 (Corner bottom left): Position decided by bottom left corner function
 *
 * Above:
 * AH (Above here): above, same level
 * AA (Above of self or some ancestor): Above, compute active level using classification functions, e.g. log, sin, mx + t
 *
 * Below:
 * BH (Below here)
 * BA (Below of self or some ancestor)
 *
 * Left of:
 * LH (Left of here)
 * LA (Left of self or some ancestor)
 *
 * Right of:
 * RH (Right of here)
 * RA (Right of self or some ancestor)
 *
 * Inside / inline
 * IL (Inline left)
 * IR (Inline right)
 */
export declare const classes: {
    [key: string]: number;
};
/**
 * A list of matrices that are used to define the callback function.
 *
 * @type {{6x6: *[], 10x10: *[], 10x10-no-inline: *[]}}
 */
export declare const defaultMatrices: MatrixList;
/**
 * Computes the average width and height for cells in a room.
 *
 * @param room
 * @param matrix
 * @returns {{x: number, y: number}}
 */
export declare const getRoomScale: ({ room, matrix, }: {
    room: Room;
    matrix: number[][];
}) => Vector;
/**
 * Returns the index of the hover cell.
 *
 * @param mouse
 * @param scale
 */
export declare const getMouseHoverCell: ({ mouse, scale, }: {
    mouse: Vector;
    scale: Vector;
}) => MatrixIndex;
export declare const computeHover: (drag: ComponetizedCell, hover: ComponetizedCell, actions: Callbacks, { room, mouse, matrix, callbacks, }: {
    room: Room;
    mouse: Vector;
    callbacks: CallbackList;
    matrix: number[][];
}, m: string) => any;
/**
 * Return the mouse position relative to the cell.
 */
export declare const relativeMousePosition: ({ mouse, position, scale, }: {
    mouse: Vector;
    scale: Vector;
    position: MatrixIndex;
}) => {
    x: number;
    y: number;
};
/**
 * Computes the drop level based on the mouse position and the cell width.
 */
export declare const computeLevel: ({ size, levels, position, }: {
    size: number;
    levels: number;
    position: number;
}) => number;
/**
 * Computes the horizontal drop level based on the mouse position.
 *
 * @param mouse
 * @param position
 * @param hover
 * @param scale
 * @param level
 * @param inv returns the inverse drop level. Usually true for left and above drop level computation.
 * @returns number
 */
export declare const computeHorizontal: ({ mouse, position, hover, scale, level, }: {
    mouse: Vector;
    position: MatrixIndex;
    scale: Vector;
    level: number;
    hover: ComponetizedRow;
}, inv?: boolean) => number;
/**
 * Computes the vertical drop level based on the mouse position.
 *
 * @returns number
 */
export declare const computeVertical: ({ level, mouse, hover, position, scale, }: {
    level: number;
    mouse: Vector;
    hover: ComponetizedRow;
    position: MatrixIndex;
    scale: Vector;
}, inv?: boolean) => number;
/**
 * A list of callbacks.
 */
export declare const defaultCallbacks: CallbackList;
export declare type HoverServiceProps = {
    matrices?: MatrixList;
    callbacks?: CallbackList;
};
/**
 * The HoverService uses callbacks and matrices to compute hover logic.
 *
 * @class HoverService
 */
export default class HoverService {
    callbacks: CallbackList;
    matrices: MatrixList;
    constructor({ matrices, callbacks }?: HoverServiceProps);
    hover(drag: ComponetizedCell, hover: ComponetizedCell, actions: Callbacks, { room, mouse, matrix: use, }: {
        room: Room;
        mouse: Vector;
        matrix: string;
    }): any;
}
//# sourceMappingURL=index.d.ts.map