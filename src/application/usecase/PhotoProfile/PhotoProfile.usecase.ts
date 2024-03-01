import * as multer from 'multer';
import * as cloudinary from 'cloudinary';
import PhotoProfileRepositoryInterface from "../../repository/PhotoProfileRepositoryInterface";
import { config } from 'dotenv';
config();

// Configura o Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.APIKey,
  api_secret: process.env.APISecret,
});

    export default class PhotoProfile {
        constructor(readonly repo: PhotoProfileRepositoryInterface) {}
        async execute(props: Input): Promise<Output> {
            const image = await cloudinary.v2.uploader.upload(props.image)
            const URLImage = image.secure_url
            await this.repo.NewPhotoProfile(props.id, URLImage);
            return {
                URLImage: URLImage
            }
        }
    }

export type Input = {
    id: string,
    image: multer.MulterS3.File,
}

export type Output = {
    URLImage: string
}