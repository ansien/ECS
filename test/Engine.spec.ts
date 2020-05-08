import 'jest-extended';
import { Engine, Entity, Family, System } from '../src';
import { TestAssembler } from './data/TestAssembler';
import { TestComponent } from './data/TestComponent';
import { TestSystem } from './data/TestSystem';

describe('Engine', () =>
{
    test('Create engine', () => {
        const testEngine = new Engine();
        expect(testEngine).toBeInstanceOf(Engine);
    });

    test('Create entity', () => {
        const testEngine = new Engine();
        const testEntity = testEngine.createEntity();
        expect(testEngine).toBeInstanceOf(Engine);
        expect(testEntity).toBeInstanceOf(Entity);
    });

    test('Create entity with component pre-added', () => {
        const testEngine = new Engine();
        const testEntity = testEngine.createEntity(new TestComponent(5));
        expect(testEngine).toBeInstanceOf(Engine);
        expect(testEntity).toBeInstanceOf(Entity);
        expect(testEntity.hasComponent(TestComponent)).toBeTrue();
    });

    test('Create entity from assembler', () => {
        const testEngine = new Engine();
        const testEntity = testEngine.createEntityFromAssembler(TestAssembler);
        expect(testEngine).toBeInstanceOf(Engine);
        expect(testEntity).toBeInstanceOf(Entity);
        expect(testEntity.getComponent(TestComponent)).toBeInstanceOf(TestComponent);
    });

    test('Destroy entity', () => {
        const testEngine = new Engine();
        const testEntity = testEngine.createEntity();
        expect(testEngine.entityRegistry.entities.size).toBe(1);
        testEngine.destroyEntity(testEntity)
        expect(testEngine.entityRegistry.entities.size).toBe(0);
    });

    test('Create family', () => {
        const testEngine = new Engine();
        const testFamily = testEngine.createFamily([], [], []);
        expect(testFamily).toBeInstanceOf(Family);
    });

    test('Attach system', () => {
        const testEngine = new Engine();
        const testSystem = testEngine.attachSystem(TestSystem);
        expect(testSystem).toBeInstanceOf(System);
        expect(testEngine.systemRegistry.systems.size).toBe(1);
    });

    test('Detach system', () => {
        const testEngine = new Engine();
        testEngine.attachSystem(TestSystem);
        expect(testEngine.systemRegistry.systems.size).toBe(1);
        testEngine.detachSystem(TestSystem);
        expect(testEngine.systemRegistry.systems.size).toBe(0);
    });

    test('Update loop', () => {
        const testEngine = new Engine();
        const testSystem = testEngine.attachSystem(TestSystem);
        expect(testEngine.systemRegistry.systems.size).toBe(1);
        const updateSpy = jest.spyOn(testSystem, 'update');
        testEngine.update(5);
        expect(updateSpy).toHaveBeenCalledWith(5);
    });
});