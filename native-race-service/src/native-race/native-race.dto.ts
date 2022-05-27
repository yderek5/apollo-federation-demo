import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('NativeRace')
export class NativeRaceDto {
  @IDField(() => ID)
  id!: number;

  @FilterableField()
  name!: string;

  @Field()
  temperment: string;

  @FilterableField()
  homePlanet!: string;
}
