import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Commitment } from '../commitment/commitment.entity';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Investor {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  dateAdded: Date;

  @Field(() => [Commitment], { nullable: true })
  @OneToMany(() => Commitment, (commitment) => commitment.investor)
  commitments: Commitment[];

  @Field(() => Float, { nullable: true })
  totalCommitment?: number;
}
