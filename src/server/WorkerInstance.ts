import cluster from 'cluster';
import { PROCESS_ACTION } from './ServerInstance';

export class WorkerInstance
{
    private _id: number;

    constructor(id: number) {
        this._id = id;

        if (process.send) {
            process.send({ ID: cluster.worker.id, ACTION: PROCESS_ACTION.READY });
        }
    }
}

new WorkerInstance(cluster.worker.id);