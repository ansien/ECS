import { Engine } from './Engine';
import { Component } from './Component';
import { Map, List } from 'immutable';
import { Newable } from './types';

export class Entity
{
    private readonly _engine: Engine;
    private readonly _id: number;

    private _components: Map<string, List<Component>> = Map();

    constructor(engine: Engine, id: number, components: Map<string, List<Component>>) {
        this._engine = engine;
        this._id = id;
        this._components = components;
    }

    public addComponent<T extends Component>(component: T): T {
        if (!component.allowMultiple) {
            if (this.hasComponent(component.constructor.name)) {
                throw new Error(
                    `"${component.constructor.name}" component has allowMultiple set to ${component.allowMultiple}. Trying to add a "${component.constructor.name}" component to an entity which already has one.`
                );
            }
        }

        const componentList = this._components.get(component.constructor.name);

        if (!componentList) {
            this._components = this._components.set(component.constructor.name, List([ component ]));
        } else {
            const newComponentList = componentList.push(component);
            this._components = this._components.set(component.constructor.name, newComponentList);
        }

        this._engine.familyRegistry.onComponentAdded(this);

        return component;
    }

    public removeComponent(component: Component): boolean {
        const componentList = this._components.get(component.constructor.name);
        if (!componentList) return false;

        const componentIndex = componentList.findIndex(needleComponent => needleComponent === component);
        if (componentIndex === -1) return false;

        const newComponentList = componentList.remove(componentIndex);

        if (newComponentList.size <= 0) {
            this._components = this._components.remove(component.constructor.name);
        } else {
            this._components = this._components.set(component.constructor.name, newComponentList);
        }

        this._engine.familyRegistry.onComponentRemoved(this);

        return true;
    }

    public getComponent<T extends Component>(ComponentDefinition: Newable<T>, index = 0): T {
        const componentList = this._components.get(ComponentDefinition.name);

        if (!componentList) {
            throw new Error(`Unable to find component ${ComponentDefinition.name} in entity with ID: ${this.id}`);
        }

        const component = componentList.get(index);

        if (!component) {
            throw new Error(`Unable to find component ${ComponentDefinition.name} at index ${index} in entity with ID: ${this.id}`);
        }

        return component as T;
    }

    public getComponentSafe<T extends Component>(ComponentDefinition: Newable<T>, index = 0): T | undefined {
        const componentList = this._components.get(ComponentDefinition.name);

        if (!componentList) {
            return undefined;
        }

        const component = componentList.get(index);

        if (!component) {
            return undefined;
        }

        return component as T;
    }

    public getComponents<T extends Component>(ComponentDefinition: Newable<T>): T[] {
        const components = this._components.get(ComponentDefinition.name);

        if (!components) {
            return [];
        }

        return components.toArray() as T[];
    }

    public hasComponent(componentName: Newable<Component> | string): boolean {
        if (typeof componentName === 'string') {
            return this._components.has(componentName);
        }

        return this._components.has(componentName.name);
    }

    get id(): number {
        return this._id;
    }
}