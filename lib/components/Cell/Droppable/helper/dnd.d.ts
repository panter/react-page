import { ComponetizedCell } from '../../../../types/editable';
export declare const target: {
    hover: any;
    canDrop: ({ id, ancestors }: ComponetizedCell, monitor: any) => boolean;
    drop(hover: ComponetizedCell, monitor: any, component: any): void;
};
export declare const connect: (connectInner: any, monitor: any) => {
    connectDropTarget: any;
    isOver: any;
    isOverCurrent: any;
};
//# sourceMappingURL=dnd.d.ts.map