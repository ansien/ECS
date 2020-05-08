# BrowserByte/ECS

Simple Entity Component System written in TypeScript.

## Features

- Fully written in TypeScript
- Fully tested 
- Large focus on performance, handles thousands of entities without a problem.
- Simple API
- Component serialization and deserialization (for networking or storage purposes).
- Used in multiple real-world applications.

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

// Create a component class
class TestComponent extends Component
{
    public testValue: number;

    constructor(testValue: number) {
        super();

        this.testValue = testValue;
    }

    allowMultiple = true;
}

// Create a system
class TestSystem extends System
{
    private _testFamily!: Family;

    onAttach(engine: Engine): void {
        this._testFamily = engine.createFamily([ TestComponent ], [], []);
    }

    update(delta: number): void {
        this._testFamily.entities.forEach(entity => {
            const testComponent = testTwoEntity.getComponent(TestComponent);
            testComponent.testValue += 1;
        });
    }
}

// Create an entity with a component
const testEntity = ECS.createEntity(new TestComponent(2));

// Attach the system to the engine and run the update loop
ECS.attachSystem(TestSystem);
setInterval(() => ECS.update(deltaTime), 1000);
```

See the ``/examples`` folder for more example usages.