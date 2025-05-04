import multer from 'multer'

const storage = multer.diskStorage({})

const fileFilter  = (req,file,cb)=>{


    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'video/mp4',
        'video/mpeg',
        'video/quicktime',
        'video/x-msvideo',
        'video/x-ms-wmv'
    ]
    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(new Error("Only image and video files are allowed!"),false)
    }
}

const upload = multer({storage,fileFilter})

export const uploadFields = upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'videos', maxCount: 5 }
  ]);