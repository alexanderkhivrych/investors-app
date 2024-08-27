import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AssetSummary {
  @Field()
  assetName: string;

  @Field()
  totalAmount: number;
}
