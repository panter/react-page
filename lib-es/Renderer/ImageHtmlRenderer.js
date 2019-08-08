import * as React from 'react';
import { iconStyle } from './../common/styles';
import { lazyLoad } from '@react-page/core';
const ImageIcon = lazyLoad(() => import('@material-ui/icons/Landscape'));
const ImageHtmlRenderer = props => {
    const { isEditMode, state, imagePreview } = props;
    const src = imagePreview ? imagePreview.dataUrl : state.src;
    const Image = React.createElement("img", { className: "ory-plugins-content-image", alt: "", src: src });
    return src ? (React.createElement("div", null, state.href && !isEditMode ? (React.createElement("a", { href: state.href, target: state.target, rel: state.rel }, Image)) : (Image))) : (React.createElement("div", null,
        React.createElement("div", { className: "ory-plugins-content-image-placeholder" },
            React.createElement(ImageIcon, { style: iconStyle }))));
};
export default ImageHtmlRenderer;
//# sourceMappingURL=ImageHtmlRenderer.js.map