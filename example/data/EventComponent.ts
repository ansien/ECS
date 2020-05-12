import { Component } from '../../src';
import { TestEvent } from './TestEvent';

export class EventComponent extends Component
{
    public testValue: number;

    constructor(testValue: number) {
        super();

        this.testValue = testValue;

        this.subscribeToEvent(TestEvent, this.handleTestEvent)
    }

    handleTestEvent(event: TestEvent) {
        console.log('@handle', event);
    }

    deserialize(serializedData: string): void {
        const deserializedData = JSON.parse(serializedData);

        this.testValue = deserializedData.testValue;
    }

    serialize(): string {
        const serializedData = {
            testValue: this.testValue
        };

        return JSON.stringify(serializedData);
    }

    allowMultiple = true;
}