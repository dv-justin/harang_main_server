export abstract class S3TempStorageServicePort {
  uploadFile: (file: Express.Multer.File[]) => Promise<{ fileUrl: string[] }>;
}
