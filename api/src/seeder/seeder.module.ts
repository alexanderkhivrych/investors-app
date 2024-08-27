import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investor } from '../investor/investor.entity';
import { SeederService } from './seeder.service';
import { Commitment } from '../commitment/commitment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Investor]),
    TypeOrmModule.forFeature([Commitment]),
  ],
  providers: [SeederService],
})
export class SeedModule {}
