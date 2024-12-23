import { Test, TestingModule } from '@nestjs/testing';
import { UserCreatedService } from './user-created.service';

describe('UserCreatedService', () => {
  let service: UserCreatedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCreatedService],
    }).compile();

    service = module.get<UserCreatedService>(UserCreatedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
