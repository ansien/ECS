import cluster from 'cluster';
import os from 'os';
import { PROCESS_ACTION } from '../common/types';
import { ActionHandler } from './ActionHandler';
import { Newable } from '../../../dist/types';
import { IPublicRegistry } from './registry/PublicRegistry';
import { inject as Inject } from 'inversify';
import { IWorkerRegistry } from './registry/WorkerRegistry';
import { WebSocketServer } from './WebSocketServer';
import { TYPES } from '../containerTypes';
import { injectable as Injectable } from 'inversify';

export interface ServerInstanceOptions {
    port?: number;
    pingInterval?: number;
    workerCount?: number;
}

@Injectable()
export class EdosServer
{
    @Inject(TYPES.IPublicRegistry) private _publicRegistry!: IPublicRegistry;
    @Inject(TYPES.IWorkerRegistry) private _workerRegistry!: IWorkerRegistry;

    private _options!: ServerInstanceOptions;

    public start(options: ServerInstanceOptions): void {
        this._options = options;

        cluster.setupMaster({
            exec: __dirname + '/../Worker/WorkerInstance'
        });

        const workerCount = options.workerCount ?? os.cpus().length;
        for(let i = 0; i < workerCount; i++) {
            this.startWorker();
        }
    }

    private startWorker(): void {
        const worker = cluster.fork();
        this._workerRegistry.workers.set(worker.id, worker);

        worker.on('message', (msg) => {
            console.log('Master ' + process.pid + ' received message from worker:', msg);

            if (msg.ACTION === PROCESS_ACTION.READY) {
                this._workerRegistry.readyWorkersCount++;

                if (this._workerRegistry.workersReady()) {
                    new WebSocketServer(this._options);
                }
            }
        });
    }

    public registerActionHandler(handler: Newable<ActionHandler>): void {
        this._publicRegistry.registerActionHandler(handler);
    }
}