import { Row } from '../../../types/editable';
export declare const isEmpty: ({ cells, rows, layout: { plugin: { name: layout } }, content: { plugin: { name: content } }, }: {
    cells: import("../../../types/editable").AbstractCell<Row>[];
    rows: Row[];
    layout?: {
        plugin?: any;
    };
    content?: {
        plugin?: any;
    };
}) => boolean;
export declare const emptyFilter: (state: any) => boolean;
//# sourceMappingURL=empty.d.ts.map