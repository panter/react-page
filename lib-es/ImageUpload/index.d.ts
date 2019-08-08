import * as React from 'react';
import { ImageLoaded, ImageUploadType, ImageUploaded } from './types';
export declare type ImageUploadProps = {
    imageLoaded?: (image: ImageLoaded) => void;
    imageUpload: ImageUploadType;
    imageUploadError?: (errorCode: number) => void;
    imageUploaded: (resp: ImageUploaded) => void;
    icon?: JSX.Element;
    style?: React.CSSProperties;
    maxFileSize?: number;
    allowedExtensions?: string[];
    translations?: {
        [key: string]: string;
    };
};
export declare type ImageUploadState = {
    isUploading: boolean;
    hasError: boolean;
    errorText: string;
    progress: number;
};
declare class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {
    static defaultProps: {
        icon: JSX.Element;
        allowedExtensions: string[];
        maxFileSize: number;
        translations: {
            buttonContent: string;
            noFileError: string;
            badExtensionError: string;
            tooBigError: string;
            uploadingError: string;
            unknownError: string;
        };
    };
    fileInput: HTMLInputElement;
    state: ImageUploadState;
    props: ImageUploadProps;
    hasExtension: (fileName: string) => boolean;
    handleError: (errorCode: number) => void;
    handleFileSelected: React.ChangeEventHandler<HTMLInputElement>;
    readFile(file: File): Promise<ImageLoaded>;
    handleFileUploadClick: React.MouseEventHandler<HTMLElement>;
    handleReportProgress: (progress: number) => void;
    renderChildren: () => JSX.Element;
    render(): JSX.Element;
}
export default ImageUpload;
//# sourceMappingURL=index.d.ts.map