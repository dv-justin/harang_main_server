import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity'; // 유저 엔티티를 import하세요.

@Entity('user_match_meetings')
export class UserMatchMeetingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.match_meetings_man, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'man_user_id' })
  man_user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.match_meetings_female, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'female_user_id' })
  female_user: UserEntity;

  @Column({ type: 'tinyint' })
  meeting_status: number;

  @Column({ type: 'tinyint' })
  man_user_ticket_used: number;

  @Column({ type: 'tinyint' })
  female_user_ticket_used: number;

  @Column({ type: 'tinyint' })
  is_failed: number;

  @Column({ length: 255, default: null })
  meeting_location: string;

  @Column({ length: 255, default: null })
  meeting_address: string;

  @Column({ length: 255, default: null })
  meeting_schedule: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
