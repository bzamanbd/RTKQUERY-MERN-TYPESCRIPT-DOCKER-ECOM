interface ImgOptions {
    inputPath: string;
    outputDir: string;
    imgWidth: number;
    imgQuality: number;
}
export declare const processImage: ({ inputPath, outputDir, imgWidth, imgQuality }: ImgOptions) => Promise<string>;
export declare const deleteFile: (filePath: string) => void;
export {};
