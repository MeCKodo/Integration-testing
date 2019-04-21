import { ServiceLoader } from '../service/ServiceLoader';
import { ServiceConfig } from '../service/config';
import { PostService } from '../service';
import { AccountService } from '../service';
import { getEntity } from '../store/getEntity';

class SomeTestClass {
  count: number = 0;

  testGetEntity1(testId: number) {
    const data = getEntity(testId);
    return data;
  }

  getPost(data: any) {
    const postService = ServiceLoader.getInstance<PostService>(
      ServiceConfig.POST_SERVICE,
    );
    const post = postService.getPost(data);
    const postIsPermission = postService.isPermission(true, false);
    // console.log(postService, '--postService');
    return { post, postIsPermission };
  }

  getAccount(data: any) {
    const accountService = ServiceLoader.getInstance<AccountService>(
      ServiceConfig.ACCOUNT_SERVICE,
    );
    // console.log(accountService, '--accountService');
    const account = accountService.getCurrentAccount(data);
    return account;
  }

  getPostAndAccount(data: any) {
    const postService = ServiceLoader.getInstance<PostService>(
      ServiceConfig.POST_SERVICE,
    );
    const accountService = ServiceLoader.getInstance<AccountService>(
      ServiceConfig.ACCOUNT_SERVICE,
    );
    // console.log(postService, '--postService');
    // console.log(accountService, '--accountService');
    const post = postService.getPost(data);
    const postIsPermission = postService.isPermission(true, false);
    const account = accountService.getCurrentAccount(data);
    return { post, account, postIsPermission };
  }
}

export { SomeTestClass };
