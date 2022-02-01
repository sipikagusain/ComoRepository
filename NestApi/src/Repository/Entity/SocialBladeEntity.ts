import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
 
@Entity()
export class SocialBladeEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  Rank: number;
 
  @Column()
  Grade: string;
 
  @Column()
  DisplayName: string;
   
  @Column()
  Videos: string;

  @Column()
  Subscriber: string;
   
  @Column()
  Views: string;
}