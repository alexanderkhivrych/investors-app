import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommitmentService } from './commitment.service';
import { CommitmentResolver } from './commitment.resolver';
import { Commitment } from './commitment.entity';

@Module({
  exports: [CommitmentService, CommitmentResolver],
  imports: [TypeOrmModule.forFeature([Commitment])],
  providers: [CommitmentService, CommitmentResolver],
})
export class CommitmentModule {}
