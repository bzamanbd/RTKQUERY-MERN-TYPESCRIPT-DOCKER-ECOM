export interface IMediaProcessor {
    files?: any;
    destinationDir?: any;
    imgSize?: number;
    imgQuality?: number;
    isImage?: boolean;
    videoSize?: number;
}
declare const mediaProcessor: {
    processAndMoveMedia: ({ files, destinationDir, imgSize, imgQuality, isImage, videoSize }?: IMediaProcessor) => Promise<any>;
    deleteTempFiles: (files: any) => void;
};
export default mediaProcessor;
