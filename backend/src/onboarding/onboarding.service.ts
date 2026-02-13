import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Onboarding } from './entities/onboarding.entity';
import { CreateOnboardingDto } from './dto/onboarding.dto';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(Onboarding)
    private onboardingRepository: Repository<Onboarding>,
  ) {}

  async create(data: CreateOnboardingDto) {
    const existingOnboarding = await this.onboardingRepository.findOne({
      where: [{ documento: data.documento }, { email: data.email }],
    });

    if (existingOnboarding) {
      throw new Error(
        'Onboarding with the same documento or email already exists',
      );
    }

    const record = this.onboardingRepository.create({
      ...data,
      status: 'REQUESTED',
    });
    const savedRecord = await this.onboardingRepository.save(record);
    console.log('Onboarding created:', savedRecord.id);
    return {
      onboardingId: savedRecord.id,
      status: savedRecord.status,
    };
  }

  async findAll() {
    return await this.onboardingRepository.find();
  }
}
