import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { CommitmentService } from './commitment.service';
import { Commitment } from './commitment.entity';
import { AssetSummary } from './dto/asset-summary';

@Resolver(() => Commitment)
export class CommitmentResolver {
  constructor(private readonly commitmentService: CommitmentService) {}

  @Query(() => [AssetSummary])
  async assetSummaries(
    @Args('investorId', { type: () => Int }) investorId: number
  ): Promise<AssetSummary[]> {
    return this.commitmentService.getAssetSummaries(investorId);
  }

  @Query(() => [Commitment])
  async commitments(
    @Args('investorId', { type: () => Int }) investorId: string,
    @Args('assetName', { nullable: true }) assetName?: string
  ): Promise<Commitment[]> {
    return this.commitmentService.findAllFiltered(investorId, assetName);
  }
}
