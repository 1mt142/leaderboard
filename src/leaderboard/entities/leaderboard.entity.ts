import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Leaderboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  score: number;
}
