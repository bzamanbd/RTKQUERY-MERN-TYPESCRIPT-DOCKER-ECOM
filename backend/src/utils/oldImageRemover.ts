
import path from "path"
import fs from 'fs'

export const oldImageRemover = ({existImage}:any) =>{ 
    if (fs.existsSync(existImage)) {
        if (existImage) {
            const oldLogoPath = path.join(existImage)
            fs.unlinkSync(oldLogoPath)
        }
    }
}




export const deleteFile = (filePath:string) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${filePath}`, err);
        }
    });
};