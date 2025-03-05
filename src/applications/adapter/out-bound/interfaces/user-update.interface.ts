import { UserStatus } from 'src/applications/domain/enums/user-status.enum';

export interface UserUpdateInterface {
  birthdate?: string;
  name?: string;
  gender?: string;
  phone_number?: string;
  region_level1?: string;
  region_level2?: string;
  church_name?: string;
  pastor_name?: string;
  school_and_major?: string;
  company_name?: string;
  your_faith?: string;
  influential_verse?: string;
  prayer_topic?: string;
  vision?: string;
  couple_activity?: string;
  expected_meeting?: string;
  merit?: string;
  status?: UserStatus;
  ideal_type_age?: string;
  ideal_type_distance?: number;
  profile_image?: object;
}