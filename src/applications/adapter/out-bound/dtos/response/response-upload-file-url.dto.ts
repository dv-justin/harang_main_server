import { Exclude, Expose } from 'class-transformer';

export class StorageUrlDto {
  @Expose()
  Location: string;

  @Exclude()
  Bucket: string;

  @Exclude()
  Key: string;

  @Exclude()
  ETag: string;
}
