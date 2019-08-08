import { Row } from '../../../types/editable';
export declare const flatten: <T>(c: T[], n: T[]) => T[];
export declare const optimizeCells: (cells?: import("../../../types/editable").AbstractCell<Row>[]) => import("../../../types/editable").AbstractCell<Row>[];
export declare const optimizeRows: (rows?: Row[]) => Row[];
export declare const optimizeCell: ({ rows, ...other }: import("../../../types/editable").AbstractCell<Row>) => import("../../../types/editable").AbstractCell<Row>;
export declare const optimizeRow: ({ cells, ...other }: Row) => Row;
//# sourceMappingURL=optimize.d.ts.map