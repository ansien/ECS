import { EntityEvent } from '../../src/EntityEvent';

export class TestEvent extends EntityEvent
{
    public testValue: number;

    constructor(testValue: number) {
        super();

        this.testValue = testValue;
    }
}