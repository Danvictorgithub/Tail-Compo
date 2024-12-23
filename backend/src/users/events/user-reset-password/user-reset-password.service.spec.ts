import { Test, TestingModule } from '@nestjs/testing';
import { UserResetPasswordService } from './user-reset-password.service';

describe('UserResetPasswordService', () => {
  let service: UserResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResetPasswordService],
    }).compile();

    service = module.get<UserResetPasswordService>(UserResetPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
