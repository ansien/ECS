import cluster from 'cluster';
import { WebSocketServer } from './WebSocketServer';
import os from 'os';
import { MessageHandler } from './MessageHandler';
import { PROCESS_ACTION } from '../common/types';
import { WorkerRegistry } from './registry/WorkerRegistry';
import { ActionHandler } from './ActionHandler';
import { Newable } from '../../../dist/types';

export interface ServerInstanceOptions {
    port?: number;
    pingInterval?: number;
    workerCount?: number;
}

export class ServerInstance
{
    private readonly _options: ServerInstanceOptions;

    private readonly _workerRegistry: WorkerRegistry;
    private readonly _messageHandler: MessageHandler;

    constructor(options: ServerInstanceOptions) {
        this._options = options;

        this._workerRegistry = new WorkerRegistry();
        this._messageHandler = new MessageHandler();

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
                    new WebSocketServer(this._options, this._messageHandler);
                }
            }
        });
    }

    public registerActionHandler(actionHandler: Newable<ActionHandler>) {

    }
}