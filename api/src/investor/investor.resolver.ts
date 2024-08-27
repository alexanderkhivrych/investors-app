import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { InvestorService } from './investor.service';
import { CommitmentService } from '../commitment/commitment.service';
import { Investor } from './investor.entity';

@Resolver(() => Investor)
export class InvestorResolver {
  constructor(
    private readonly investorService: InvestorService,
    private readonly commitmentService: CommitmentService
  ) {}

  @Query(() => [Investor])
  async investors(): Promise<Investor[]> {
    return this.investorService.findAll();
  }

  @ResolveField(() => Number)
  async totalCommitment(@Parent() investor: Investor): Promise<number> {
    return this.commitmentService.calculateTotalCommitmentForInvestor(
      investor.id
    );
  }

  @Query(() => Investor)
  async investor(@Args('id', { type: () => Int }) id: number) {
    return this.investorService.findOne(id);
  }
}
