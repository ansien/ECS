import 'jest-extended';
import { Engine} from '../src';
import { TestComponent } from './data/TestComponent';
import { MultipleFalseComponent } from './data/MultipleFalseComponent';

describe('Family', () =>
{
    test('Entity matching', () => {
        const testEngine = new Engine();

        const testFamilyOne = testEngine.createFamily([ TestComponent ], [], []);
        const testFamilyTwo = testEngine.createFamily([ MultipleFalseComponent ], [], []);

        const testEntity = testEngine.createEntity(new TestComponent(5));

        expect(testFamilyOne.isEntityMatch(testEntity)).toBeTrue();
        expect(testFamilyTwo.isEntityMatch(testEntity)).toBeFalse();
    });
});