import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/onboarding.dto';

@ApiTags('onboarding')
@ApiBearerAuth()
@Controller('onboarding')
export class OnboardingController {
  constructor(private onboardingService: OnboardingService) {}

  @ApiOperation({ summary: 'Create new onboarding record' })
  @ApiResponse({ status: 201, description: 'Onboarding created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Post()
  createOnboarding(@Body() CreateOnboardingDto: CreateOnboardingDto) {
    return this.onboardingService.create(CreateOnboardingDto);
  }

  @ApiOperation({ summary: 'Get all onboarding records' })
  @ApiResponse({ status: 200, description: 'List of onboarding records' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.onboardingService.findAll();
  }
}
