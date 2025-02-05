import { Expose } from 'class-transformer';

export class ResponseUserFindOneDto {
  @Expose()
  id?: number;

  @Expose()
  name?: string;

  @Expose()
  gender?: string;

  @Expose()
  birthdate?: string;

  @Expose()
  phone_number?: string;

  @Expose()
  region_level1?: string;

  @Expose()
  region_level2?: string;

  @Expose()
  church_name?: string;

  @Expose()
  pastor_name?: string;

  @Expose()
  school_and_major?: string;

  @Expose()
  company_name?: string;

  @Expose()
  your_faith?: string;

  @Expose()
  influential_verse?: string;

  @Expose()
  prayer_topic?: string;

  @Expose()
  vision?: string;

  @Expose()
  couple_activity?: string;

  @Expose()
  expected_meeting?: string;

  @Expose()
  merit?: string;

  @Expose()
  status?: string;
}
