# BrowserByte/ECS

Simple Entity Component System written in TypeScript.

## Features

- Fully written in TypeScript
- Fully tested 
- Large focus on performance. Handles thousands of entities without a problem.
- Simple API.

## Installation

Using npm:

```bash
$ npm install @browserbyte/ecs
```

Using yarn:

```bash
$ yarn add @browserbyte/ecs
```

## Example usage

Below is a small example on how you could use this package, there are multiple ways to accomplish certain things.

```typescript
const ECS = new Engine();

// Create an entity with a components
const testTwoEntity = ECS.createEntity(new TestComponent(2));

// Get and modify component data
const testComponent = testTwoEntity.getComponent<TestComponent>(TestComponent);
testComponent.testValue = 3;

// Create an entity from an assembler
ECS.createEntityFromAssembler(TestAssembler);

// Create a family
ECS.createFamily([ TestComponent ], [], []);

// Attach, update and detach systems
ECS.attachSystem(TestSystem);
ECS.update(1000);
```

See the ``/examples`` folder for more example usages.