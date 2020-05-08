import { Engine } from '../Engine';
import { Map } from 'immutable';
import { System } from '../System';
import { Newable } from '../types';

export class SystemRegistry
{
    private readonly _engine: Engine;

    private _systems: Map<string, System> = Map();

    constructor(engine: Engine) {
        this._engine = engine;
    }

    public attachSystem(SystemDefinition: Newable<System>): System {
        const system = new SystemDefinition();

        this._systems = this._systems.set(SystemDefinition.name, system);

        system.onAttach(this._engine);

        return system;
    }

    public detachSystem(SystemDefinition: Newable<System>): void {
        const system = this._systems.get(SystemDefinition.name);

        if (!system) {
            throw new Error(`System with name: ${SystemDefinition.name} is not attached.`);
        }

        system.onDetach(this._engine);

        this._systems = this._systems.remove(SystemDefinition.name);
    }

    get systems(): Map<string, System> {
        return this._systems;
    }
}
