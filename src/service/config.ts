import { AccountService } from './AccountService';
import { PostService } from './PostService';

const ServiceConfig = {
  ACCOUNT_SERVICE: 'AccountService',
  POST_SERVICE: 'PostService',
};

const config = {
  classes: [
    { name: ServiceConfig.ACCOUNT_SERVICE, value: AccountService },
    { name: ServiceConfig.POST_SERVICE, value: PostService },
  ],
};

export { ServiceConfig, config };
