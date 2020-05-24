import cluster from 'cluster';

export class WorkerRegistry
{
    private _workers: Map<number, cluster.Worker> = new Map();
    private _readyWorkersCount = 0;

    public workersReady(): boolean {
        return this.readyWorkersCount >= this._workers.size;
    }

    get workers(): Map<number, cluster.Worker> {
        return this._workers;
    }

    get readyWorkersCount(): number {
        return this._readyWorkersCount;
    }

    set readyWorkersCount(value: number) {
        this._readyWorkersCount = value;
    }
}
