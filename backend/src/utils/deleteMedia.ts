import fs from 'fs';
import path from 'path';

const deleteMedia = (mediaPath:any) => {
    const fullPath = path.join(process.cwd(), '.', mediaPath);
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error('Error deleting media file:', err);
      } else {
        console.log('Product media files deleted successfully');
      }
    });
};

export default deleteMedia
  