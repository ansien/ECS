import { EntityRegistry } from './registry/EntityRegistry';
import { SystemRegistry } from './registry/SystemRegistry';
import { FamilyRegistry } from './registry/FamilyRegistry';
import { Component } from './Component';
import { Newable } from './types';
import { Entity } from './Entity';
import { Family } from './Family';
import { Set, List } from 'immutable';
import { System } from './System';
import { Assembler } from './Assembler';

let nextEngineId = 0;

export class Engine
{
    private readonly _id: number;
    private readonly _entityRegistry: EntityRegistry;
    private readonly _systemRegistry: SystemRegistry;
    private readonly _familyRegistry: FamilyRegistry;

    constructor(...systems: Newable<System>[]) {
        this._id = ++nextEngineId;
        this._entityRegistry = new EntityRegistry(this);
        this._systemRegistry = new SystemRegistry(this);
        this._familyRegistry = new FamilyRegistry(this);

        systems.forEach(system => {
            this.attachSystem(system);
        })
    }

    public createEntity(...components: Component[]): Entity {
        return this._entityRegistry.createEntity(List(components));
    }

    public createEntityFromAssembler(AssemblerDefinition: Newable<Assembler>): Entity {
        return this._entityRegistry.createEntityFromAssembler(AssemblerDefinition);
    }

    public destroyEntity(entity: Entity): void {
        return this._entityRegistry.destroyEntity(entity);
    }

    public createFamily(
        any: Newable<Component>[],
        all: Newable<Component>[],
        none: Newable<Component>[]
    ): Family {
        return this._familyRegistry.createFamily(Set(any), Set(all), Set(none));
    }

    public attachSystem(SystemDefinition: Newable<System>): System {
        return this._systemRegistry.attachSystem(SystemDefinition);
    }

    public detachSystem(systemDefinition: Newable<System>): void {
        this._systemRegistry.detachSystem(systemDefinition);
    }

    public update(delta: number): void {
        this._systemRegistry.systems.forEach(system => {
            system.update(delta);
        });
    }

    /**
     * @internal
     */
    get entityRegistry(): EntityRegistry {
        return this._entityRegistry;
    }

    /**
     * @internal
     */
    get systemRegistry(): SystemRegistry {
        return this._systemRegistry;
    }

    /**
     * @internal
     */
    get familyRegistry(): FamilyRegistry {
        return this._familyRegistry;
    }
}
