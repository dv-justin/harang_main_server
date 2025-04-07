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

@Entity('user_matchs')
export class UserMatchEntity {
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

  @Column({ type: 'boolean' })
  man_user_ticket_used: boolean;

  @Column({ type: 'boolean' })
  female_user_ticket_used: boolean;

  @Column({ type: 'boolean' })
  is_failed: boolean;

  @Column({ type: 'tinyint' })
  all_tickets_used_by: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
