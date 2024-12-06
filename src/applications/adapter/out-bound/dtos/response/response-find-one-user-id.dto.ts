import { Expose } from 'class-transformer';

export class ResponseFindOneByUserIdDto {
  @Expose()
  id: number;

  @Expose()
  gender: string;
}
