export abstract class StorageAdapterPort {
  uploadFile: (file: Express.Multer.File)=> Promise<string>;
}
