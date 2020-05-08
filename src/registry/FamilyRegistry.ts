import { Engine } from '../Engine';
import { Family } from '../Family';
import { List, Set } from 'immutable';
import { Newable } from '../types';
import { Component } from '../Component';
import { Entity } from '../Entity';

export class FamilyRegistry
{
    private readonly _engine: Engine;

    private _families: List<Family> = List();

    constructor(engine: Engine) {
        this._engine = engine;
    }

    public createFamily(
        any: Set<Newable<Component>>,
        all: Set<Newable<Component>>,
        none: Set<Newable<Component>>
    ): Family {
        const family = new Family(this._engine.entityRegistry, any, all, none);

        this._families = this._families.push(family);

        return family;
    }

    public onEntityCreated(entity: Entity): void {
        this._families.forEach((family) => family.onEntityCreated(entity));
    }

    public onEntityDestroyed(entity: Entity): void {
        this._families.forEach((family) => family.onEntityDestroyed(entity));
    }

    public onComponentAdded(entity: Entity): void {
        this._families.forEach((family) => family.onComponentAdded(entity));
    }

    public onComponentRemoved(entity: Entity): void {
        this._families.forEach((family) => family.onComponentRemoved(entity));
    }
}