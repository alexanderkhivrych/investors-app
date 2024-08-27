import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investor } from '../investor/investor.entity';
import { Commitment } from '../commitment/commitment.entity';
import * as fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Investor)
    private readonly investorsRepository: Repository<Investor>,

    @InjectRepository(Commitment)
    private readonly commitmentsRepository: Repository<Commitment>
  ) {}

  async onApplicationBootstrap() {
    await this.seedFromCSV();
  }

  private async seedFromCSV() {
    const existingInvestors = await this.investorsRepository.count();
    if (existingInvestors === 0) {
      const investorsData = [];
      const commitmentsData = [];

      fs.createReadStream(path.resolve(__dirname, './assets/data.csv'))
        .pipe(csv())
        .on('data', (row) => {
          // Assuming the CSV file contains columns for both investor and commitment details
          // Adjust field names as necessary
          const name = row['Investor Name']?.trim() || 'Unknown Investor';
          const type = row['Investory Type']?.trim() || 'Unknown Type';
          const address = row['Investor Country']?.trim() || 'Unknown Address';
          const dateAdded =
            row['Investor Date Added']?.trim() || new Date().toISOString();

          if (!name || !type) {
            console.error(`Missing required fields: name or type in row`, row);
            return;
          }

          const investor = {
            name,
            type,
            address,
            dateAdded,
          };
          const commitment = {
            assetName: row['Commitment Asset Class'] || 'Unknown Asset',
            amount: parseFloat(row['Commitment Amount']),
            currency: row['Commitment Currency'],
            investor: investor, // Associate commitment with investor
          };

          investorsData.push(investor);
          commitmentsData.push(commitment);
        })
        .on('end', async () => {
          // Remove duplicates and save investors first
          const uniqueInvestors = Array.from(
            new Set(investorsData.map((inv) => inv.name))
          ).map((name) => {
            return investorsData.find((inv) => inv.name === name);
          });

          // Save investors
          const savedInvestors = await this.investorsRepository.save(
            uniqueInvestors
          );
          console.log('Investors saved:', savedInvestors);

          // Map commitments to saved investors
          const commitmentsWithInvestor = commitmentsData.map((commitment) => {
            const investor = savedInvestors.find(
              (inv) => inv.name === commitment.investor.name
            );
            return {
              ...commitment,
              investor: investor,
            };
          });

          // Save commitments
          await this.commitmentsRepository.save(commitmentsWithInvestor);
          console.log('Commitments saved.');
        });
    }
  }
}
