import { config } from './config';

import container from './container/Container';
config.classes.forEach(config => container.registerClass(config));

class ServiceLoader {
  static getInstance<T extends {}>(serviceName: string): T {
    console.log(serviceName, '---name');
    return container.get(serviceName);
  }
}

export { ServiceLoader };
