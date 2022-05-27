import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { NativeRaceDto } from './native-race.dto';
import { NativeRaceEntity } from './native-race.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([NativeRaceEntity])],
      resolvers: [{ DTOClass: NativeRaceDto, EntityClass: NativeRaceEntity }],
    }),
  ],
})
export class NativeRaceModule {}
