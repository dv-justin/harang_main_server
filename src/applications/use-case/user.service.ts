import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RequestSaveUserDto } from 'src/applications/adapter/in-bound/dtos/requests/request-save-user.dto';
import { UserServicePort } from '../port/in-bound/user.service.port';
import { UserRepositoryPort } from '../port/out-bound/user.repository.port';
import { AuthServicePort } from '../port/in-bound/auth.service.port';
import { ResponseGetUserIdDto } from './dtos/responses/response-get-user-id.dto';
import { ResponseGetUserPhoneNumberDto } from './dtos/responses/response-get-user-phone-number.dto';
import { ResponseGetUserIdTokenDto } from './dtos/responses/response-get-user-id-token.dto';
import { RequestUpdateUserDto } from '../adapter/in-bound/dtos/requests/request-update-user.dto';
import { UserStatus } from '../domain/enums/user-status.enum';
import { TieServicePort } from '../port/in-bound/tie.service.port';
import { RequestUpdateIdealTypeDto } from '../adapter/in-bound/dtos/requests/request-update-ideal-type.dto';
import { ResponseUpdateIdealTypeDto } from './dtos/responses/response-update-ideal-type.dto';
import { ResponseGetIdealTypeDto } from './dtos/responses/response-get-ideal-type.dto';

@Injectable()
export class UserService implements UserServicePort {
  constructor(
    @Inject(forwardRef(() => UserRepositoryPort))
    private readonly userRepositoryPort: UserRepositoryPort,
    private readonly authServicePort: AuthServicePort,

    @Inject(forwardRef(() => TieServicePort))
    private readonly tieServicePort: TieServicePort,
  ) {}

  async getUserId(
    user_id: number,
    include_match: boolean,
  ): Promise<ResponseGetUserIdDto> {
    let tie;
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
    } = await this.userRepositoryPort.findOne({
      where: { id: user_id },
      select: [
        'id',
        'status',
        'name',
        'birthdate',
        'gender',
        'phone_number',
        'region_level1',
        'region_level2',
        'church_name',
        'pastor_name',
        'school_and_major',
        'company_name',
        'your_faith',
        'influential_verse',
        'prayer_topic',
        'vision',
        'couple_activity',
        'expected_meeting',
        'merit',
      ],
    });

    if (include_match) {
      tie = await this.tieServicePort.getTieMatchStatus(id);
    }

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
      manUserTicketUsed: tie?.man_user_ticket_used,
      femaleUserTicketUsed: tie?.female_user_ticket_used,
      allTicketsUsedBy: tie?.all_tickets_used_by,
    };
  }

  async getUserIdToken(user_id: number): Promise<ResponseGetUserIdTokenDto> {
    const {
      id: id,
      status: status,
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
    } = await this.userRepositoryPort.findOne({
      where: { id: user_id },
      select: [
        'id',
        'status',
        'name',
        'birthdate',
        'gender',
        'phone_number',
        'region_level1',
        'region_level2',
        'church_name',
        'pastor_name',
        'school_and_major',
        'company_name',
        'your_faith',
        'influential_verse',
        'prayer_topic',
        'vision',
        'couple_activity',
        'expected_meeting',
        'merit',
      ],
    });

    return {
      id,
      status,
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
    const user = await this.userRepositoryPort.findOne({
      where: { phone_number: phone_number },
      select: ['id', 'phone_number'],
    });
    if (user) {
      const tokens = await this.authServicePort.generateTokens(user?.id);
      const return_user = { status: user?.status, ...tokens };
      return return_user;
    }

    return null;
  }

  async saveUser(dto: RequestSaveUserDto): Promise<void> {
    const save_user = { ...dto };

    const user = await this.userRepositoryPort.findOne({
      where: { phone_number: save_user?.phone_number },
      select: ['phone_number'],
    });

    if (user) {
      return;
    }

    await this.userRepositoryPort.save(save_user);
  }

  async updateUser(user_id: number, dto: RequestUpdateUserDto): Promise<void> {
    const {
      name,
      gender,
      birthdate,
      phone_number,
      region_level1,
      region_level2,
      church_name,
      pastor_name,
      school_and_major,
      company_name,
      your_faith,
      influential_verse,
      prayer_topic,
      vision,
      couple_activity,
      expected_meeting,
      merit,
    } = dto;

    const user = {
      id: user_id,
      name,
      gender,
      birthdate,
      phone_number,
      region_level1,
      region_level2,
      church_name,
      pastor_name,
      school_and_major,
      company_name,
      your_faith,
      influential_verse,
      prayer_topic,
      vision,
      couple_activity,
      expected_meeting,
      merit,
    };
    await this.userRepositoryPort.save({ ...user, status: UserStatus.PENDING });
  }

  async updateIdealType(
    user_id: number,
    dto: RequestUpdateIdealTypeDto,
  ): Promise<ResponseUpdateIdealTypeDto> {
    await this.userRepositoryPort.update({ id: user_id }, dto);

    const ideal = await this.userRepositoryPort.findOne({
      where: { id: user_id },
      select: ['ideal_type_age', 'ideal_type_distance'],
    });

    return {
      idealTypeAge: ideal?.ideal_type_age,
      idealTypeDistance: ideal?.ideal_type_distance,
    };
  }

  async getIdealType(user_id: number): Promise<ResponseGetIdealTypeDto> {
    const result = await this.userRepositoryPort.findOne({
      where: { id: user_id },
      select: ['ideal_type_age', 'ideal_type_distance'],
    });

    return {
      idealTypeAge: result?.ideal_type_age,
      idealTypeDistance: result?.ideal_type_distance,
    };
  }

  async deleteUser(user_id: number): Promise<void> {
    await this.userRepositoryPort.delete(user_id);
  }
}
