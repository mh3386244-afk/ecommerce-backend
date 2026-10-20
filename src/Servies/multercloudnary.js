import multer from "multer"

export const MulterWithCloudinary=()=>{
    const storage = multer.diskStorage({

    });

    const FileUpload = multer({storage})
    return FileUpload;
}