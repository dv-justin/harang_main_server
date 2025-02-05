export abstract class S3TempStorageAdapterPort {
  uploadFile: (file: Express.Multer.File)=> Promise<string>;
}
