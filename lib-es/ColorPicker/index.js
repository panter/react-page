import * as React from 'react';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import ColorizeIcon from '@material-ui/icons/Colorize';
import { ChromePicker } from 'react-color';
import { colorToString } from './colorToString';
class ColorPicker extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isColorPickerVisible: false,
        };
        this.handleClickShowColorPicker = (e) => {
            if (this.props.onDialogOpen) {
                this.props.onDialogOpen();
            }
            this.setState({ isColorPickerVisible: !this.state.isColorPickerVisible });
        };
        this.onChange = e => this.props.onChange && this.props.onChange(e.rgb);
        this.handleChangeComplete = e => this.props.onChangeComplete && this.props.onChangeComplete(e.rgb);
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { buttonRef: node => {
                    this.anchorEl = node;
                }, variant: "contained", onClick: this.handleClickShowColorPicker, style: Object.assign({}, this.props.style, { borderColor: colorToString(this.props.color), borderStyle: 'solid', borderWidth: '2px' }) },
                this.props.buttonContent,
                this.props.icon),
            React.createElement(Popover, { className: "ory-prevent-blur", open: this.state.isColorPickerVisible, anchorEl: this.anchorEl, onClose: this.handleClickShowColorPicker, anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }, transformOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                } },
                React.createElement("div", { className: "ory-prevent-blur" },
                    React.createElement(ChromePicker, { color: this.props.color, onChange: this.onChange, onChangeComplete: this.handleChangeComplete })))));
    }
}
ColorPicker.defaultProps = {
    buttonContent: 'Change color',
    icon: React.createElement(ColorizeIcon, { style: { marginLeft: '4px', fontSize: '19px' } }),
};
export default ColorPicker;
//# sourceMappingURL=index.js.map