export interface DraggableProps {
    isDragging: boolean;
    className: string;
    insert: any;
    connectDragSource<T>(element: T): T;
    connectDragPreview<T>(element: T): T;
    layoutMode(): void;
}
declare const _default: (dragType?: string) => any;
export default _default;
//# sourceMappingURL=index.d.ts.map