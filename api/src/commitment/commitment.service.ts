import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commitment } from './commitment.entity';
import { AssetSummary } from './dto/asset-summary';

@Injectable()
export class CommitmentService {
  constructor(
    @InjectRepository(Commitment)
    private readonly commitmentRepository: Repository<Commitment>
  ) {}

  async getAssetSummaries(investorId: number): Promise<AssetSummary[]> {
    const assetSummaries = await this.commitmentRepository
      .createQueryBuilder('commitment')
      .select('commitment.assetName', 'assetName')
      .addSelect('SUM(commitment.amount)', 'totalAmount')
      .where('commitment.investorId = :investorId', { investorId })
      .groupBy('commitment.assetName')
      .getRawMany();

    return assetSummaries.map((summary) => ({
      assetName: summary.assetName,
      totalAmount: parseFloat(summary.totalAmount),
    }));
  }

  async calculateTotalCommitmentForInvestor(
    investorId: number
  ): Promise<number> {
    const result = await this.commitmentRepository
      .createQueryBuilder('commitment')
      .select('SUM(commitment.amount)', 'total')
      .where('commitment.investorId = :investorId', { investorId })
      .getRawOne();

    return parseFloat(result.total) || 0;
  }

  async findAllFiltered(
    investorId: string,
    assetName?: string
  ): Promise<Commitment[]> {
    const query = this.commitmentRepository
      .createQueryBuilder('commitment')
      .where('commitment.investorId = :investorId', { investorId });

    if (assetName) {
      query.andWhere('commitment.assetName = :assetName', { assetName });
    }

    return query.getMany();
  }
}
