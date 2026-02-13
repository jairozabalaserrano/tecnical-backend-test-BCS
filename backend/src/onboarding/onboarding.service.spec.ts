import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingService } from './onboarding.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Onboarding } from './entities/onboarding.entity';
import { ConflictException } from '@nestjs/common';

describe('OnboardingService', () => {
  let service: OnboardingService;
  let repoMock: {
    create: jest.Mock;
    save: jest.Mock;
    findOne: jest.Mock;
    find: jest.Mock;
  };

  beforeEach(async () => {
    repoMock = {
      create: jest.fn().mockImplementation((dto: any) => dto as Onboarding),
      save: jest
        .fn()
        .mockImplementation((user) =>
          Promise.resolve({ id: '123', ...user, status: 'REQUESTED' }),
        ),
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnboardingService,
        {
          provide: getRepositoryToken(Onboarding),
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<OnboardingService>(OnboardingService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe crear un onboarding exitosamente si no existe duplicado', async () => {
    repoMock.findOne.mockResolvedValue(null);

    const dto = {
      nombre: 'Test User',
      documento: '12345678',
      email: 'test@example.com',
      montoInicial: 1000,
    };

    const result = await service.create(dto);

    expect(repoMock.findOne).toHaveBeenCalled();
    expect(repoMock.create).toHaveBeenCalledWith({
      ...dto,
      status: 'REQUESTED',
    });
    expect(repoMock.save).toHaveBeenCalled();
    expect(result).toEqual({
      onboardingId: '123',
      status: 'REQUESTED',
    });
  });

  it('debe lanzar ConflictException si el documento ya existe', async () => {
    repoMock.findOne.mockResolvedValue({ id: '1', documento: '12345678' });

    const dto = {
      nombre: 'Test User',
      documento: '12345678',
      email: 'otro@example.com',
      montoInicial: 1000,
    };

    await expect(service.create(dto)).rejects.toThrow(ConflictException);

    expect(repoMock.save).not.toHaveBeenCalled();
  });

  it('debe retornar todos los onboardings', async () => {
    const mockList = [{ id: '1' }, { id: '2' }];
    repoMock.find.mockResolvedValue(mockList);

    const result = await service.findAll();
    expect(result).toEqual(mockList);
    expect(repoMock.find).toHaveBeenCalled();
  });
});
