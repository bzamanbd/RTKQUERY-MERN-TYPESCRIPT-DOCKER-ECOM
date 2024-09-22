import fs from 'fs';

// Utility function to delete multiple files (images and videos)
const deleteTempFiles = (files:Express.Multer.File[]) => {
  files.forEach((file) => {
    if (!file || typeof file.path !== 'string') {
      console.error(`Error: Invalid file object or path for ${file}`);
      return;
    }

    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(`Error deleting file ${file.path}:`, err);
      } else {
        console.log(`File deleted successfully: ${file.path}`);
      }
    });
  });
};

export default deleteTempFiles;
