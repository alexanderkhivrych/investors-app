import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Investor } from '../investor/investor.entity';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Commitment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  assetName: string;

  @Field()
  @Column()
  currency: string;

  @Field(() => Float)
  @Column('float')
  amount: number;

  @ManyToOne(() => Investor, (investor) => investor.commitments)
  @Field(() => Investor)
  investor: Investor;
}
