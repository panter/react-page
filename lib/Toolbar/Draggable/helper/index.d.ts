export declare const source: {
    beginDrag({ insert, ...props }: {
        insert: Object;
        layoutMode(): void;
    }): {
        layoutMode(): void;
        node: Object;
        rawNode: () => Object;
    };
    endDrag(props: any, monitor: any): void;
};
export declare const collect: (connect: any, monitor: any) => {
    connectDragSource: any;
    isDragging: any;
    connectDragPreview: any;
};
//# sourceMappingURL=index.d.ts.map