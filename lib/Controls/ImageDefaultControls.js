"use strict";
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
var FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
var ui_1 = require("@react-page/ui");
var ui_2 = require("@react-page/ui");
var ThemeProvider_1 = __importStar(require("@react-page/ui/lib/ThemeProvider"));
var ImageDefaultControls = function (props) {
    var handleImageLoaded = props.handleImageLoaded, handleImageUploaded = props.handleImageUploaded, handleChange = props.handleChange;
    return (React.createElement(ThemeProvider_1.default, { theme: ThemeProvider_1.darkTheme },
        React.createElement(ui_2.BottomToolbar, { open: props.focused, theme: ThemeProvider_1.darkTheme },
            React.createElement("div", { style: { display: 'flex' } },
                props.imageUpload && (React.createElement(React.Fragment, null,
                    React.createElement(ui_1.ImageUpload, { translations: props.translations, imageUpload: props.imageUpload, imageLoaded: handleImageLoaded, imageUploaded: handleImageUploaded }),
                    React.createElement(Typography_1.default, { variant: "body1", style: { marginLeft: '20px', marginRight: '20px' } }, props.translations.or))),
                React.createElement(TextField_1.default, { placeholder: props.translations.srcPlaceholder, label: props.imageUpload
                        ? props.translations.haveUrl
                        : props.translations.imageUrl, name: "src", style: { flex: 1 }, value: props.state.src, onChange: handleChange })),
            React.createElement(TextField_1.default, { placeholder: props.translations.hrefPlaceholder, label: props.translations.hrefLabel, name: "href", style: { width: '512px' }, value: props.state.href, onChange: handleChange }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(FormControlLabel_1.default, { control: React.createElement(Checkbox_1.default, { checked: props.state.target === '_blank', name: "target", onChange: handleChange }), label: props.translations.openNewWindow }))));
};
exports.default = ImageDefaultControls;
//# sourceMappingURL=ImageDefaultControls.js.map