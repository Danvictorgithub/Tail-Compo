import { UserSelfGuard } from './user-self.guard';

describe('UserSelfGuard', () => {
  it('should be defined', () => {
    expect(new UserSelfGuard()).toBeDefined();
  });
});
