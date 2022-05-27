import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NativeRaceEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  temperment: string;

  @Column()
  homePlanet!: string;
}
