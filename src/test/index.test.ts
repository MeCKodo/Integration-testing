import { runner, mockStore, test, mockService } from '../IntegrationTest';
import { SomeTestClass } from './index';
import { AccountService } from '../service/AccountService';
import { PostService } from '../service/PostService';

runner(() => {
  const mockData = {};
  const mockAccount = {};
  let someTestClass: SomeTestClass;
  beforeEach(() => {
    console.log('before');
    someTestClass = new SomeTestClass();
  });

  class TestOne {
    @test('case description 2 [JPT-456]')
    @mockService(PostService, [
      { method: 'isPost' },
      { method: 'getPost', data: { post: 'post' } },
      {
        method: 'isPermission',
        data: (isPermission: boolean, other) => {
          // impl bussiness login
          return {
            isPermission: true,
            other: true,
          };
        },
      },
    ])
    @mockService(AccountService, 'getCurrentAccount', { act: 'account' })
    JPT456() {
      const obj = someTestClass.getPostAndAccount(123);
      expect(obj).toEqual({
        post: { post: 'post' },
        account: { act: 'account' },
        postIsPermission: {
          isPermission: true,
          other: true,
        },
      });
    }

    @test('test mock store [JPT-123]')
    @mockService(PostService, [
      { method: 'isPost' },
      { method: 'getPost', data: { name: '123' } },
    ])
    JPT123() {
      const obj = someTestClass.getPost('sdfsdf');
      expect(obj).toEqual({ post: { name: '123' } });
    }
  }

  return TestOne;
});
