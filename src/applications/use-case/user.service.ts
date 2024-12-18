import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RequestSaveUserDto } from 'src/applications/adapter/in-bound/dtos/requests/request-save-user.dto';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { UserRepositoryPort } from '../port/out-bound/user.repository.port';
import { AuthServicePort } from '../port/in-bound/auth.service.port';
import { ResponseGetUserIdDto } from './dtos/responses/reponse-get-user-id.dto';
import { ResponseGetUserPhoneNumberDto } from './dtos/responses/response-get-user-phone-number.dto';

@Injectable()
export class UserService implements UserServicePort {
  constructor(
    @Inject(forwardRef(() => UserRepositoryPort))
    private readonly userRepositoryPort: UserRepositoryPort,
    private readonly authServicePort: AuthServicePort,
  ) {}

  async getUserId(user_id: number): Promise<ResponseGetUserIdDto> {
    const {
      id: id,
      name: name,
      gender: gender,
      birthdate: birthdate,
      phone_number: phoneNumber,
      region_level1: regionLevel1,
      region_level2: regionLevel2,
      church_name: churchName,
      pastor_name: pastorName,
      school_and_major: schoolAndMajor,
      company_name: companyName,
      your_faith: yourFaith,
      influential_verse: influentialVerse,
      prayer_topic: prayerTopic,
      vision: vision,
      couple_activity: coupleActivity,
      expected_meeting: expectedMeeting,
      merit: merit,
    } = await this.userRepositoryPort.findOneUserId(user_id);

    return {
      id,
      name,
      gender,
      birthdate,
      phoneNumber,
      regionLevel1,
      regionLevel2,
      churchName,
      pastorName,
      schoolAndMajor,
      companyName,
      yourFaith,
      influentialVerse,
      prayerTopic,
      vision,
      coupleActivity,
      expectedMeeting,
      merit,
    };
  }

  async getUserPhoneNumber(
    phone_number: string,
  ): Promise<ResponseGetUserPhoneNumberDto> {
    const user =
      await this.userRepositoryPort.findOneByPhoneNumber(phone_number);

    const tokens = await this.authServicePort.generateTokens(user?.id);
    const return_user = { status: user?.status, ...tokens };
    return return_user;
  }

  async saveUser(dto: RequestSaveUserDto): Promise<void> {
    const save_user = { ...dto };

    const user = await this.userRepositoryPort.findOneByPhoneNumber(
      save_user?.phone_number,
    );

    if (user) {
      return;
    }

    await this.userRepositoryPort.save(save_user);
  }
}
