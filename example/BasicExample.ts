import { Engine } from '../src';
import { TestSystem } from './data/TestSystem';
import { TestComponent } from './data/TestComponent';
import { TestAssembler } from './data/TestAssembler';

const engine = new Engine();

// Create entity and component(s) separately
const testEntity = engine.createEntity();
const testComponent = new TestComponent(1);
testEntity.addComponent(testComponent);

// Create entity with components (best performance)
const testTwoEntity = engine.createEntity(new TestComponent(2));

// Get and modify a component
const tComponent = testTwoEntity.getComponent<TestComponent>(TestComponent);
tComponent.testValue = 3;

// Get all components (entity can have multiple of the same component)
testTwoEntity.getComponents<TestComponent>(TestComponent);

// Check if entity has a component
testTwoEntity.hasComponent(TestComponent);

// Remove a component from an entity
testEntity.removeComponent(testComponent);

// Destroy an entity
engine.destroyEntity(testTwoEntity);

// Create an entity from an assembler
engine.createEntityFromAssembler(TestAssembler);

// Create a family
engine.createFamily([ TestComponent ], [], []);

// Attach, update and detach a system
engine.attachSystem(TestSystem);
engine.update(1000);
engine.detachSystem(TestSystem);