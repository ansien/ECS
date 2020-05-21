import cluster from 'cluster';
import { WebSocketServer } from './WebSocketServer';
import * as os from 'os';

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

    constructor(options: ServerInstanceOptions) {
        this._options = options;
        cluster.isMaster ? this.master(options) : this.worker();
    }

    private master(options: ServerInstanceOptions): void {
        const workerCount = options.workerCount ?? os.cpus().length
        for(let i = 0; i < workerCount; i++) {
            this.startWorker();
        }
    }

    private worker(): void {
        if (!process.send) return;
        process.send({ ID: cluster.worker.id, ACTION: PROCESS_ACTION.READY });
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
                    new WebSocketServer(this._options);
                }
            }
        });
    }
}