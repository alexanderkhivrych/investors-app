import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investor } from './investor.entity';

@Injectable()
export class InvestorService {
  constructor(
    @InjectRepository(Investor)
    private investorsRepository: Repository<Investor>
  ) {}

  findAll(): Promise<Investor[]> {
    return this.investorsRepository.find({ relations: ['commitments'] });
  }

  findOne(id: number): Promise<Investor> {
    return this.investorsRepository.findOne({
      where: { id },
      relations: ['commitments'],
    });
  }
}
