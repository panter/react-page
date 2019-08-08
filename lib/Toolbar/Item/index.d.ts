import * as React from 'react';
import { Plugin } from '@react-page/core/lib/service/plugin/classes';
import { Translations } from '../';
export interface ItemProps {
    plugin: Plugin;
    insert: any;
    translations: Translations;
}
export interface ItemState {
    tooltipVisible: boolean;
}
declare class Item extends React.Component<ItemProps, ItemState> {
    constructor(props: ItemProps);
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    render(): JSX.Element;
}
export default Item;
//# sourceMappingURL=index.d.ts.map