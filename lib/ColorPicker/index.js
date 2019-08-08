"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Popover_1 = __importDefault(require("@material-ui/core/Popover"));
var Colorize_1 = __importDefault(require("@material-ui/icons/Colorize"));
var react_color_1 = require("react-color");
var colorToString_1 = require("./colorToString");
var ColorPicker = /** @class */ (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isColorPickerVisible: false,
        };
        _this.handleClickShowColorPicker = function (e) {
            if (_this.props.onDialogOpen) {
                _this.props.onDialogOpen();
            }
            _this.setState({ isColorPickerVisible: !_this.state.isColorPickerVisible });
        };
        _this.onChange = function (e) {
            return _this.props.onChange && _this.props.onChange(e.rgb);
        };
        _this.handleChangeComplete = function (e) {
            return _this.props.onChangeComplete && _this.props.onChangeComplete(e.rgb);
        };
        return _this;
    }
    ColorPicker.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button_1.default, { buttonRef: function (node) {
                    _this.anchorEl = node;
                }, variant: "contained", onClick: this.handleClickShowColorPicker, style: __assign({}, this.props.style, { borderColor: colorToString_1.colorToString(this.props.color), borderStyle: 'solid', borderWidth: '2px' }) },
                this.props.buttonContent,
                this.props.icon),
            React.createElement(Popover_1.default, { className: "ory-prevent-blur", open: this.state.isColorPickerVisible, anchorEl: this.anchorEl, onClose: this.handleClickShowColorPicker, anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }, transformOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                } },
                React.createElement("div", { className: "ory-prevent-blur" },
                    React.createElement(react_color_1.ChromePicker, { color: this.props.color, onChange: this.onChange, onChangeComplete: this.handleChangeComplete })))));
    };
    ColorPicker.defaultProps = {
        buttonContent: 'Change color',
        icon: React.createElement(Colorize_1.default, { style: { marginLeft: '4px', fontSize: '19px' } }),
    };
    return ColorPicker;
}(React.Component));
exports.default = ColorPicker;
//# sourceMappingURL=index.js.map