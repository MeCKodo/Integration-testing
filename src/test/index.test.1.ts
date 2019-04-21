import { runner, mockStore, test } from '../IntegrationTest';
import { SomeTestClass } from './index';

runner(() => {
  let someTestClass: SomeTestClass;
  beforeEach(() => {
    someTestClass = new SomeTestClass();
  });

  class TestOne {
    @test('id = 123, age = 789')
    @mockStore({ age: 789 })
    caseAbc() {
      const obj = someTestClass.testGetEntity1(123);
      expect(obj).toEqual({ age: 789 });
    }

    @test('age: 18')
    @mockStore({ age: 18 })
    caseBcd() {
      const obj = someTestClass.testGetEntity2(123);
      expect(obj).toEqual({ age: 18 });
    }
  }

  return TestOne;
});
