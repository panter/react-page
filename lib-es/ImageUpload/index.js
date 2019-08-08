import * as React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ErrorIcon from '@material-ui/icons/Error';
import { defaultTranslations } from './defaultTranslations';
const NO_FILE_ERROR_CODE = 1;
const BAD_EXTENSION_ERROR_CODE = 2;
const TOO_BIG_ERROR_CODE = 3;
const UPLOADING_ERROR_CODE = 4;
class ImageUpload extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isUploading: false,
            hasError: false,
            errorText: '',
            progress: 0,
        };
        this.hasExtension = (fileName) => {
            const patternPart = this.props.allowedExtensions
                ? this.props.allowedExtensions.map(a => a.toLowerCase()).join('|')
                : '';
            const pattern = '(' + patternPart.replace(/\./g, '\\.') + ')$';
            return new RegExp(pattern, 'i').test(fileName.toLowerCase());
        };
        this.handleError = (errorCode) => {
            let errorText = '';
            switch (errorCode) {
                case NO_FILE_ERROR_CODE:
                    errorText = this.props.translations.noFileError;
                    break;
                case BAD_EXTENSION_ERROR_CODE:
                    errorText = this.props.translations.badExtensionError;
                    break;
                case TOO_BIG_ERROR_CODE:
                    errorText = this.props.translations.tooBigError;
                    break;
                case UPLOADING_ERROR_CODE:
                    errorText = this.props.translations.uploadingError;
                    break;
                default:
                    errorText = this.props.translations.unknownError;
                    break;
            }
            // Need to flick "isUploading" because otherwise the handler doesn't fire properly
            this.setState({ hasError: true, errorText, isUploading: true }, () => this.setState({ isUploading: false }));
            setTimeout(() => this.setState({ hasError: false, errorText: '' }), 5000);
        };
        this.handleFileSelected = e => {
            if (!e.target.files || !e.target.files[0]) {
                this.handleError(NO_FILE_ERROR_CODE);
                return;
            }
            const file = e.target.files[0];
            if (!this.hasExtension(file.name)) {
                this.handleError(BAD_EXTENSION_ERROR_CODE);
                return;
            }
            if (file.size > this.props.maxFileSize) {
                this.handleError(TOO_BIG_ERROR_CODE);
                return;
            }
            if (this.props.imageLoaded) {
                this.readFile(file).then(data => this.props.imageLoaded(data));
            }
            if (this.props.imageUpload) {
                this.setState({ isUploading: true });
                this.props
                    .imageUpload(file, this.handleReportProgress)
                    .then(resp => {
                    this.setState({ progress: undefined, isUploading: false });
                    this.props.imageUploaded && this.props.imageUploaded(resp);
                })
                    .catch(error => {
                    this.setState({ isUploading: false });
                    this.props.imageUploadError && this.props.imageUploadError(error);
                });
            }
        };
        this.handleFileUploadClick = () => this.fileInput.click();
        this.handleReportProgress = (progress) => this.setState({ progress });
        this.renderChildren = () => {
            if (this.state.isUploading) {
                return React.createElement(CircularProgress, { value: this.state.progress, size: 19 });
            }
            if (this.state.hasError) {
                return (React.createElement(React.Fragment, null,
                    this.state.errorText,
                    React.createElement(ErrorIcon, { style: { marginLeft: '8px' } })));
            }
            return (React.createElement(React.Fragment, null,
                this.props.translations.buttonContent,
                this.props.icon));
        };
    }
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            // Read the image via FileReader API and save image result in state.
            reader.onload = function (e) {
                // Add the file name to the data URL
                // tslint:disable-next-line:no-any
                let dataUrl = e.target.result;
                dataUrl = dataUrl.replace(';base64', `;name=${file.name};base64`);
                resolve({ file, dataUrl });
            };
            reader.readAsDataURL(file);
        });
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { disabled: this.state.isUploading, variant: "contained", color: this.state.hasError ? 'secondary' : 'primary', onClick: this.handleFileUploadClick, style: this.props.style }, this.renderChildren()),
            !this.state.isUploading && (React.createElement("input", { style: { display: 'none' }, ref: fileInput => (this.fileInput = fileInput), type: "file", onChange: this.handleFileSelected }))));
    }
}
ImageUpload.defaultProps = {
    icon: React.createElement(CloudUploadIcon, { style: { marginLeft: '8px' } }),
    allowedExtensions: ['jpg', 'jpeg', 'png'],
    maxFileSize: 5242880,
    translations: defaultTranslations,
};
export default ImageUpload;
//# sourceMappingURL=index.js.map