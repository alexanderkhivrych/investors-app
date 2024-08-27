import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestorService } from './investor.service';
import { InvestorResolver } from './investor.resolver';
import { CommitmentModule } from '../commitment/commitment.module';
import { Investor } from './investor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Investor]), CommitmentModule],
  providers: [InvestorService, InvestorResolver],
})
export class InvestorModule {}
