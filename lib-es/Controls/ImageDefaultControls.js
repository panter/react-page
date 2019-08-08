import * as React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { ImageUpload } from '@react-page/ui';
import { BottomToolbar } from '@react-page/ui';
import { darkTheme, default as ThemeProvider } from '@react-page/ui/lib/ThemeProvider';
const ImageDefaultControls = props => {
    const { handleImageLoaded, handleImageUploaded, handleChange } = props;
    return (React.createElement(ThemeProvider, { theme: darkTheme },
        React.createElement(BottomToolbar, { open: props.focused, theme: darkTheme },
            React.createElement("div", { style: { display: 'flex' } },
                props.imageUpload && (React.createElement(React.Fragment, null,
                    React.createElement(ImageUpload, { translations: props.translations, imageUpload: props.imageUpload, imageLoaded: handleImageLoaded, imageUploaded: handleImageUploaded }),
                    React.createElement(Typography, { variant: "body1", style: { marginLeft: '20px', marginRight: '20px' } }, props.translations.or))),
                React.createElement(TextField, { placeholder: props.translations.srcPlaceholder, label: props.imageUpload
                        ? props.translations.haveUrl
                        : props.translations.imageUrl, name: "src", style: { flex: 1 }, value: props.state.src, onChange: handleChange })),
            React.createElement(TextField, { placeholder: props.translations.hrefPlaceholder, label: props.translations.hrefLabel, name: "href", style: { width: '512px' }, value: props.state.href, onChange: handleChange }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { checked: props.state.target === '_blank', name: "target", onChange: handleChange }), label: props.translations.openNewWindow }))));
};
export default ImageDefaultControls;
//# sourceMappingURL=ImageDefaultControls.js.map