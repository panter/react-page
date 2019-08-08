import { Cell } from './editable';
export declare type Room = {
    height: number;
    width: number;
};
export declare type Vector = {
    y: number;
    x: number;
};
export declare type MatrixIndex = {
    row: number;
    cell: number;
};
export declare type Callbacks = {
    clear(id: string): void;
    above(drag: Cell, hover: Cell, level: number): void;
    below(drag: Cell, hover: Cell, level: number): void;
    leftOf(drag: Cell, hover: Cell, level: number): void;
    rightOf(drag: Cell, hover: Cell, level: number): void;
    inlineLeft(drag: Cell, hover: Cell): void;
    inlineRight(drag: Cell, hover: Cell): void;
};
export declare type Matrix = Array<Array<number>>;
//# sourceMappingURL=hover.d.ts.map