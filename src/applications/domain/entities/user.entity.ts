import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserStatus } from '../enums/user-status.enum';
import { UserMatchEntity } from './user-match.entity';
import { NotificationEntity } from './notification.entity';
import { UserPointEntity } from './user-points.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 10 })
  gender: string;

  @Column({ length: 10 })
  birthdate: string;

  @Column({ length: 20 })
  phone_number: string;

  @Column({ length: 255 })
  region_level1: string;

  @Column({ length: 255 })
  region_level2: string;

  @Column({ length: 255 })
  church_name: string;

  @Column({ length: 255 })
  pastor_name: string;

  @Column({ length: 255 })
  church_region_name: string;

  @Column({ length: 255 })
  school_and_major: string;

  @Column({ length: 255, nullable: true })
  company_name?: string;

  @Column({ type: 'text' })
  your_faith: string;

  @Column({ type: 'text' })
  influential_verse: string;

  @Column({ type: 'text' })
  prayer_topic: string;

  @Column({ type: 'text' })
  vision: string;

  @Column({ type: 'text' })
  couple_activity: string;

  @Column({ type: 'text' })
  expected_meeting: string;

  @Column({ type: 'text' })
  merit: string;

  @Column({ length: 255 })
  mbti: string;

  @Column({ type: 'json' })
  profile_image: any;

  @Column({ length: 50 })
  ideal_type_age: string;

  @Column({ type: 'int', default: 0 })
  ideal_type_distance: number;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @OneToMany(() => UserMatchEntity, (matchs) => matchs.man_user)
  match_meetings_man: UserMatchEntity[];

  @OneToMany(() => UserMatchEntity, (matchs) => matchs.female_user)
  match_meetings_female: UserMatchEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notification: NotificationEntity;

  @OneToOne(() => UserPointEntity, (user_point) => user_point.user)
  user_point: UserPointEntity;
}
