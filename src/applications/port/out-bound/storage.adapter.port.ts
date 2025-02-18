export abstract class StorageAdapterPort {
  uploadFile: (file: Express.Multer.File) => Promise<string>;
  moveFile: (key: string) => Promise<string>;
}
