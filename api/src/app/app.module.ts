import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Investor } from '../investor/investor.entity';
import { Commitment } from '../commitment/commitment.entity';
import { SeedModule } from '../seeder/seeder.module';
import { InvestorModule } from '../investor/investor.module';
import { CommitmentModule } from '../commitment/commitment.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.sqlite',
      entities: [Investor, Commitment],
      synchronize: true,
    }),
    SeedModule,
    InvestorModule,
    CommitmentModule,
  ],
})
export class AppModule {}
