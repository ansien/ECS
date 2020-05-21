import cluster from 'cluster';
import { WebSocketServer } from './WebSocketServer';
import os from 'os';
import { ActionHandler } from './ActionHandler';
import { ActionHandlerRegistry } from './registry/ActionHandlerRegistry';
import { MessageHandler } from './MessageHandler';

export interface ServerInstanceOptions {
    port?: number;
    pingInterval?: number;
    workerCount?: number;
}

export enum PROCESS_ACTION {
    READY
}

export class ServerInstance
{
    private readonly _options: ServerInstanceOptions;
    private _workers: cluster.Worker[] = [];
    private _readyWorkersCount = 0;

    private readonly _messageHandler: MessageHandler;
    private readonly _actionHandlerRegistry: ActionHandlerRegistry;

    constructor(options: ServerInstanceOptions) {
        this._options = options;

        this._actionHandlerRegistry = new ActionHandlerRegistry();
        this._messageHandler = new MessageHandler(this._actionHandlerRegistry);

        cluster.setupMaster({
            exec: __dirname + '/WorkerInstance'
        });

        const workerCount = options.workerCount ?? os.cpus().length;
        for(let i = 0; i < workerCount; i++) {
            this.startWorker();
        }
    }

    private startWorker(): void {
        const worker = cluster.fork();
        this._workers.push(worker);

        worker.on('message', (msg) => {
            console.log('Master ' + process.pid + ' received message from worker:', msg);

            if (msg.ACTION === PROCESS_ACTION.READY) {
                this._readyWorkersCount++;

                // Start the WS server once all workers are ready
                if (this._readyWorkersCount >= this._workers.length) {
                    new WebSocketServer(this._options, this._messageHandler);
                }
            }
        });
    }

    public registerActionHandlers(...actionHandlers: ActionHandler[]): void {
        actionHandlers.forEach(actionHandler => {
            this._actionHandlerRegistry.registerActionHandler(actionHandler);
        })
    }
}