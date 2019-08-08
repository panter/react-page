import { ComponetizedRow } from '../../../types/editable';
export declare const target: {
    hover: any;
    canDrop: ({ id, ancestors }: ComponetizedRow, monitor: any) => boolean;
    drop(hover: ComponetizedRow, monitor: any, component: any): void;
};
export declare const connect: (_connect: any, monitor: any) => {
    connectDropTarget: any;
    isOverCurrent: any;
};
//# sourceMappingURL=dnd.d.ts.map