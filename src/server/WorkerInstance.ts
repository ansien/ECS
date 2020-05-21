export class WorkerInstance
{
    private _id: number;

    constructor(id: number) {
        this._id = id;
        console.log('Hello from worker!');
    }
}