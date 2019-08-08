import * as React from 'react';
import { ColorChangeHandler } from 'react-color';
import { ColorPickerProps, ColorPickerState } from './types';
declare class ColorPicker extends React.Component<ColorPickerProps> {
    static defaultProps: Partial<ColorPickerProps>;
    anchorEl: HTMLElement;
    state: ColorPickerState;
    props: ColorPickerProps;
    handleClickShowColorPicker: (e: React.MouseEvent<HTMLElement>) => void;
    onChange: ColorChangeHandler;
    handleChangeComplete: ColorChangeHandler;
    render(): JSX.Element;
}
export default ColorPicker;
//# sourceMappingURL=index.d.ts.map