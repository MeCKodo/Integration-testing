import { ServiceLoader } from '../service/ServiceLoader';
import { config } from '../service/config';

function mockMethod(service, method: string, mockData: any) {
  if (!mockData) {
    service[method] = jest.fn().mockImplementation(() => {});
    return;
  }

  if (typeof mockData === 'function') {
    service[method] = jest.fn().mockImplementation((...arg) => {
      return mockData(...arg);
    });
  } else {
    service[method] = jest.fn().mockReturnValue(mockData);
  }
}

function getMockService(targetService, methods: string | [], mockData: any) {
  const { name, value: Service } = targetService;
  const service = new Service();
  if (Array.isArray(methods)) {
    methods.forEach(({ method, data }) => {
      mockMethod(service, method, data);
    });
  } else {
    mockMethod(service, methods, mockData);
  }
  return {
    name,
    service,
  };
}

const mockServiceCache = new Map();

function mockService(...rest: any[]) {
  return function(target: any, property: string, descriptor: any) {
    const oldFn = descriptor.value;
    descriptor.value = function() {
      const [ServiceClass, method, mockData] = rest;
      const targetService = config.classes.find(item => {
        return item.value === ServiceClass;
      });
      if (!targetService) {
        return descriptor;
      }

      const { name, service } = getMockService(targetService, method, mockData);
      // console.log(mockServiceCache.size, name, '---instant');
      mockServiceCache.set(name, service);

      ServiceLoader.getInstance = jest
        .fn()
        .mockImplementation((serviceName: string) => {
          if (mockServiceCache.get(serviceName)) {
            return mockServiceCache.get(serviceName);
          }
          return null;
        });
      return oldFn.apply(this, arguments);
    };
    return descriptor;
  };
}

export { mockService };
