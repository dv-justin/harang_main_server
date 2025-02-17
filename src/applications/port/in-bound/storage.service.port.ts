export abstract class StorageServicePort {
  uploadFile: (file: Express.Multer.File[]) => Promise<{ file_urls: string[] }>;
  moveFile: (urls: string[]) => Promise<{file_urls: string[]}>
}