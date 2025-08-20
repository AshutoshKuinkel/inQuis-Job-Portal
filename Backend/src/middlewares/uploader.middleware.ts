import multer from 'multer';
import fs from 'fs'
import path from 'path';
import { Request } from 'express';
import CustomError from './error-handler.middleware';

export const uploader = ()=>{

  const fileSize = 5*1024*1024

  const allowedExts = ['pdf']

  const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    
      const uploadPath = 'uploads/'

      if(!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath,{recursive:true})
      }

      cb(null,uploadPath)
    },

    filename: (req,file,cb)=>{

      const uniqueName = Date.now() + '-' + file.originalname

      cb(null,uniqueName)
    }
  })

  const fileFilter = (req:Request,file:Express.Multer.File,cb:multer.FileFilterCallback) =>{
    const ext = path.extname(file.originalname).replace('.','')
    if(allowedExts.includes(ext)){
      cb(null,true)
    }else{
      const err = new CustomError(`The file format ${ext} isn't allowed. Please select a pdf.`,400)
      cb(err)
    }
  }

  const upload = multer({storage,limits:{fileSize},fileFilter})
  return upload
}