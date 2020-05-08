import 'jest-extended';
import { Engine} from '../src';
import { MultipleFalseComponent } from './data/MultipleFalseComponent';
import { TestComponent } from './data/TestComponent';

describe('Component', () =>
{
    test('Allow multiple true should not throw error when adding multiple', () => {
        const testEngine = new Engine();
        const testEntity = testEngine.createEntity();

        testEntity.addComponent(new TestComponent(5));

        expect(testEntity.hasComponent(TestComponent)).toBeTrue();

        testEntity.addComponent(new TestComponent(10));

        expect(testEntity.getComponents(TestComponent).length).toBe(2);
    });

    test('Allow multiple false should throw error when adding multiple', () => {
        const testEngine = new Engine();
        const testEntity = testEngine.createEntity();

        testEntity.addComponent(new MultipleFalseComponent(5));

        expect(testEntity.hasComponent(MultipleFalseComponent)).toBeTrue();
        expect(() => { testEntity.addComponent(new MultipleFalseComponent(10)) }).toThrowError();
        expect(testEntity.getComponents(MultipleFalseComponent).length).toBe(1);
    });
});