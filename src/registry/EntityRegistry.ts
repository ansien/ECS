import { Engine } from '../Engine';
import { Entity } from '../Entity';
import { List, Map } from 'immutable';
import { Component } from '../Component';
import { Assembler } from '../Assembler';
import { Newable } from '../types';

let nextEntityId = 0;

export class EntityRegistry
{
    private readonly _engine: Engine;
    private _entities: Map<number, Entity> = Map();

    constructor(engine: Engine) {
        this._engine = engine;
    }

    public createEntity(components: List<Component>): Entity {
        let componentMap: Map<string, List<Component>> = Map();

        components.forEach(component => {
            const componentList = componentMap.get(component.constructor.name);

            if (!componentList) {
                componentMap = componentMap.set(component.constructor.name, List([ component ]));
            } else {
                const newComponentList = componentList.push(component);
                componentMap = componentMap.set(component.constructor.name, newComponentList);
            }
        })

        const entity = new Entity(this._engine, nextEntityId, componentMap);

        this._entities = this._entities.set(nextEntityId, entity);

        nextEntityId++;

        this._engine.familyRegistry.onEntityCreated(entity);

        return entity;
    }

    public createEntityFromAssembler(AssemblerDefinition: Newable<Assembler>): Entity {
        const assembler = new AssemblerDefinition();
        return this.createEntity(List(assembler.assemble()));
    }

    public destroyEntity(entity: Entity): void {
        this._entities = this._entities.remove(entity.id);

        this._engine.familyRegistry.onEntityDestroyed(entity);
    }

    get entities(): Map<number, Entity> {
        return this._entities;
    }
}
