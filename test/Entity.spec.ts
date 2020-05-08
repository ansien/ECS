import 'jest-extended';
import { Engine} from '../src';
import { TestComponent } from './data/TestComponent';
import { MultipleFalseComponent } from './data/MultipleFalseComponent';

describe('Entity', () =>
{
    test('Add component', () => {
        const testEngine = new Engine();
        const testEntity = testEngine.createEntity();
        const testComponent = testEntity.addComponent(new TestComponent(5));

        expect(testComponent).toBeInstanceOf(TestComponent);
        expect(testEntity.hasComponent(TestComponent)).toBeTrue();
    });

    test('Remove component', () => {
        const testEngine = new Engine();
        const testEntity = testEngine.createEntity();
        const testComponent = testEntity.addComponent(new TestComponent(5));

        expect(testComponent).toBeInstanceOf(TestComponent);
        expect(testEntity.hasComponent(TestComponent)).toBeTrue();

        testEntity.removeComponent(testComponent);

        expect(testEntity.hasComponent(TestComponent)).toBeFalse();
    });

    test('Get component', () => {
        const testEngine = new Engine();
        const testEntity = testEngine.createEntity();

        testEntity.addComponent(new TestComponent(5));

        expect(testEntity.getComponent(TestComponent)).toBeInstanceOf(TestComponent);
        expect(testEntity.getComponent(TestComponent, 0)).toBeInstanceOf(TestComponent);
        expect(() => { testEntity.getComponent(TestComponent, 5) }).toThrowError();
    });

    test('Get components', () => {
        const testEngine = new Engine();
        const testEntity = testEngine.createEntity();

        testEntity.addComponent(new TestComponent(5));

        expect(testEntity.getComponents(TestComponent).length).toBe(1);

        testEntity.addComponent(new TestComponent(10));

        expect(testEntity.getComponents(TestComponent).length).toBe(2);
    });

    test('Has components', () => {
        const testEngine = new Engine();
        const testEntity = testEngine.createEntity();

        testEntity.addComponent(new TestComponent(5));

        expect(testEntity.hasComponent(TestComponent)).toBeTrue();
    });
});