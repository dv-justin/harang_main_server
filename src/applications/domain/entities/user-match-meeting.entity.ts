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
import { UserEntity } from './user.entity';

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
  man_user_after: number;

  @Column({ type: 'tinyint' })
  female_user_after: number;

  @Column({ type: 'tinyint' })
  is_failed: number;

  @Column({ length: 10, default: null })
  all_tickets_used_by: string;

  @Column({ length: 255, default: null })
  meeting_location: string;

  @Column({ length: 255, default: null })
  meeting_address: string;

  @Column({ length: 255, default: null })
  meeting_schedule: string;

  @Column({ type: 'tinyint' })
  is_accept: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
