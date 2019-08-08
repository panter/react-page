export declare type ImageLoaded = {
    file: Object;
    dataUrl: string;
};
export declare type ImageUploaded = {
    url: string;
};
export declare type ImageUploadType = (file: File, reportProgress: (progress: number) => void) => Promise<ImageUploaded>;
//# sourceMappingURL=types.d.ts.map