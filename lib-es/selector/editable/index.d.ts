import { Row, Config, AbstractEditable, AbstractCell } from '../../types/editable';
import { RootState } from '../../types/state';
export declare const editable: (state: RootState, { id }: {
    id: string;
}) => AbstractEditable<AbstractCell<Row>>;
export declare const editables: ({ reactPage: { editables: { present }, }, }: RootState) => AbstractEditable<AbstractCell<Row>>[];
export declare const purifiedEditable: (state: RootState, props: AbstractEditable<AbstractCell<Row>>) => {
    cells: string[];
    id: string;
    config?: Config;
    cellOrder?: {
        id: string;
        isLeaf: boolean;
    }[];
};
export declare const editableConfig: (state: RootState, { editable: id }: {
    editable: string;
}) => Config;
export declare type NodeProps = {
    id: string;
    editable: string;
};
export declare const node: (state: RootState, props: NodeProps) => Row | AbstractCell<Row>;
export declare const searchNodeEverywhere: (state: RootState, id: string) => {
    node: Row | AbstractCell<Row>;
    editable: AbstractEditable<AbstractCell<Row>>;
};
export declare const purifiedNode: (state: RootState, props: {
    id: string;
    editable: string;
}) => Row | AbstractCell<Row>;
//# sourceMappingURL=index.d.ts.map