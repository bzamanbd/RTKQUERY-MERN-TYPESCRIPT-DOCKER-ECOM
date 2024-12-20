import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs'
import path from 'path';

export interface IMediaProcessor{ 
  files?:any,
  destinationDir?:any,
  imgSize?:number,
  imgQuality?:number,
  isImage?:boolean,
  videoSize?:number
}


const mediaProcessor = {
  processAndMoveMedia: async ({files, destinationDir, imgSize, imgQuality, isImage = true, videoSize}:IMediaProcessor={}) => {
    const processedFiles:any = [];

    for (const file of files) {
      
        const outputDir = path.join(process.cwd(), './public/product', destinationDir);
        
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        // Ensure that outputFilePath includes the filename, not just the directory
        const outputFilePath = path.join(outputDir, path.basename(file.path));
      
        try {
            if (isImage) {
            // Process image using sharp
            await sharp(file.path)
                .resize(imgSize) // Example resize, can be adjusted or omitted
                .jpeg({quality:imgQuality})
                .toFile(outputFilePath);
            } else {
            // Process video using ffmpeg
            await new Promise((resolve, reject) => {
                ffmpeg(file.path)
                .size(`${videoSize}x?`)
                .output(outputFilePath)
                .on('end', resolve)
                .on('error', reject)
                .run();
            });
            }
            
            processedFiles.push(outputFilePath);

        } catch (err) {
            console.error(`Error processing file: ${file.path}`, err);
            throw err;  // Re-throw to handle in the controller
        }
    }

    return processedFiles;
  }

};

export default mediaProcessor;
