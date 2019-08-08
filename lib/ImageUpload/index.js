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
var CircularProgress_1 = __importDefault(require("@material-ui/core/CircularProgress"));
var CloudUpload_1 = __importDefault(require("@material-ui/icons/CloudUpload"));
var Error_1 = __importDefault(require("@material-ui/icons/Error"));
var defaultTranslations_1 = require("./defaultTranslations");
var NO_FILE_ERROR_CODE = 1;
var BAD_EXTENSION_ERROR_CODE = 2;
var TOO_BIG_ERROR_CODE = 3;
var UPLOADING_ERROR_CODE = 4;
var ImageUpload = /** @class */ (function (_super) {
    __extends(ImageUpload, _super);
    function ImageUpload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isUploading: false,
            hasError: false,
            errorText: '',
            progress: 0,
        };
        _this.hasExtension = function (fileName) {
            var patternPart = _this.props.allowedExtensions
                ? _this.props.allowedExtensions.map(function (a) { return a.toLowerCase(); }).join('|')
                : '';
            var pattern = '(' + patternPart.replace(/\./g, '\\.') + ')$';
            return new RegExp(pattern, 'i').test(fileName.toLowerCase());
        };
        _this.handleError = function (errorCode) {
            var errorText = '';
            switch (errorCode) {
                case NO_FILE_ERROR_CODE:
                    errorText = _this.props.translations.noFileError;
                    break;
                case BAD_EXTENSION_ERROR_CODE:
                    errorText = _this.props.translations.badExtensionError;
                    break;
                case TOO_BIG_ERROR_CODE:
                    errorText = _this.props.translations.tooBigError;
                    break;
                case UPLOADING_ERROR_CODE:
                    errorText = _this.props.translations.uploadingError;
                    break;
                default:
                    errorText = _this.props.translations.unknownError;
                    break;
            }
            // Need to flick "isUploading" because otherwise the handler doesn't fire properly
            _this.setState({ hasError: true, errorText: errorText, isUploading: true }, function () {
                return _this.setState({ isUploading: false });
            });
            setTimeout(function () { return _this.setState({ hasError: false, errorText: '' }); }, 5000);
        };
        _this.handleFileSelected = function (e) {
            if (!e.target.files || !e.target.files[0]) {
                _this.handleError(NO_FILE_ERROR_CODE);
                return;
            }
            var file = e.target.files[0];
            if (!_this.hasExtension(file.name)) {
                _this.handleError(BAD_EXTENSION_ERROR_CODE);
                return;
            }
            if (file.size > _this.props.maxFileSize) {
                _this.handleError(TOO_BIG_ERROR_CODE);
                return;
            }
            if (_this.props.imageLoaded) {
                _this.readFile(file).then(function (data) { return _this.props.imageLoaded(data); });
            }
            if (_this.props.imageUpload) {
                _this.setState({ isUploading: true });
                _this.props
                    .imageUpload(file, _this.handleReportProgress)
                    .then(function (resp) {
                    _this.setState({ progress: undefined, isUploading: false });
                    _this.props.imageUploaded && _this.props.imageUploaded(resp);
                })
                    .catch(function (error) {
                    _this.setState({ isUploading: false });
                    _this.props.imageUploadError && _this.props.imageUploadError(error);
                });
            }
        };
        _this.handleFileUploadClick = function () {
            return _this.fileInput.click();
        };
        _this.handleReportProgress = function (progress) { return _this.setState({ progress: progress }); };
        _this.renderChildren = function () {
            if (_this.state.isUploading) {
                return React.createElement(CircularProgress_1.default, { value: _this.state.progress, size: 19 });
            }
            if (_this.state.hasError) {
                return (React.createElement(React.Fragment, null,
                    _this.state.errorText,
                    React.createElement(Error_1.default, { style: { marginLeft: '8px' } })));
            }
            return (React.createElement(React.Fragment, null,
                _this.props.translations.buttonContent,
                _this.props.icon));
        };
        return _this;
    }
    ImageUpload.prototype.readFile = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            // Read the image via FileReader API and save image result in state.
            reader.onload = function (e) {
                // Add the file name to the data URL
                // tslint:disable-next-line:no-any
                var dataUrl = e.target.result;
                dataUrl = dataUrl.replace(';base64', ";name=" + file.name + ";base64");
                resolve({ file: file, dataUrl: dataUrl });
            };
            reader.readAsDataURL(file);
        });
    };
    ImageUpload.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button_1.default, { disabled: this.state.isUploading, variant: "contained", color: this.state.hasError ? 'secondary' : 'primary', onClick: this.handleFileUploadClick, style: this.props.style }, this.renderChildren()),
            !this.state.isUploading && (React.createElement("input", { style: { display: 'none' }, ref: function (fileInput) { return (_this.fileInput = fileInput); }, type: "file", onChange: this.handleFileSelected }))));
    };
    ImageUpload.defaultProps = {
        icon: React.createElement(CloudUpload_1.default, { style: { marginLeft: '8px' } }),
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        maxFileSize: 5242880,
        translations: defaultTranslations_1.defaultTranslations,
    };
    return ImageUpload;
}(React.Component));
exports.default = ImageUpload;
//# sourceMappingURL=index.js.map