import { getEntity } from '../store/getEntity';
jest.mock('../store/getEntity');

function runner(getClass: any) {
  const Cls = getClass(1);
  const target = new Cls();
  const keys = Reflect.ownKeys(Cls.prototype);
  keys.forEach((fnName: any) => {
    if (fnName.startsWith('case')) {
      it(target.desc, () => target[fnName]());
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
    console.log((target.desc = desc), '---');
    return descriptor;
  };
}

export { runner, mockStore, test };
