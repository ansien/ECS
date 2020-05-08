import { Newable } from './types';
import { Component } from './Component';
import { Set } from 'immutable';
import { Entity } from './Entity';
import { EntityRegistry } from './registry/EntityRegistry';

export class Family
{
    private readonly _entityRegistry: EntityRegistry;
    private readonly _any: Set<Newable<Component>> = Set();
    private readonly _all: Set<Newable<Component>> = Set();
    private readonly _none: Set<Newable<Component>> = Set();

    private _entities: Set<Entity> = Set();

    constructor(
        entityRegistry: EntityRegistry,
        any: Set<Newable<Component>>,
        all: Set<Newable<Component>>,
        none: Set<Newable<Component>>
    ) {
        this._entityRegistry = entityRegistry;
        this._any = any;
        this._all = all;
        this._none = none;

        this.onFamilyCreate();
    }

    public onFamilyCreate() {
        this._entityRegistry.entities.forEach(entity => {
            this.checkEntity(entity);
        });
    }

    public isEntityMatch(entity: Entity): boolean {
        const hasAny = this._any.size
            ? this._any.some((c) => entity.hasComponent(c))
            : true;
        const hasAll = this._all.every((c) => entity.hasComponent(c));
        const hasNone = !this._none.some((c) => entity.hasComponent(c));

        return hasAny && hasAll && hasNone;
    }

    public checkEntity(entity: Entity) {
        if (this.isEntityMatch(entity)) {
            this._entities = this._entities.add(entity);
        } else {
            this._entities = this._entities.delete(entity);
        }
    }

    public onEntityCreated(entity: Entity) {
        this.checkEntity(entity);
    }

    public onEntityDestroyed(entity: Entity) {
        this._entities = this._entities.remove(entity);
    }

    public onComponentAdded(entity: Entity) {
        this.checkEntity(entity);
    }

    public onComponentRemoved(entity: Entity) {
        this.checkEntity(entity);
    }

    public get entities(): Set<Entity> {
        return this._entities;
    }
}
