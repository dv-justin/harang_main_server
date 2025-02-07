export abstract class StorageServicePort {
  uploadFile: (file: Express.Multer.File[]) => Promise<{ fileUrl: string[] }>;
  moveFile: (tempUrls: string[]) => Promise<{finalUrls: string[]}>
}