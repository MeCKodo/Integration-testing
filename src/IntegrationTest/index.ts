import { getEntity } from '../store/getEntity';

jest.mock('../store/getEntity');

function runner(getClass: any) {
  const Cls = getClass();
  const target = new Cls();
  const keys = Reflect.ownKeys(Cls.prototype);
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  keys.forEach((fnName: any) => {
    if (fnName.startsWith('JPT')) {
      it(target[fnName].desc, () => target[fnName]());
    }
  });
}

function mockStore(data: any) {
  return function(target: any, property: string, descriptor: any) {
    const oldFn = descriptor.value;
    descriptor.value = function() {
      (getEntity as jest.Mock).mockReturnValue(data);
      return oldFn.apply(this, arguments);
    };
    return descriptor;
  };
}

function test(desc: string) {
  return function(target: any, property: string, descriptor: any) {
    descriptor.value.desc = desc;
    return descriptor;
  };
}
export * from './mockService';
export { runner, mockStore, test };
