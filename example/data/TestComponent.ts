import { Component } from '../../src';

export class TestComponent extends Component
{
    public testValue: number;

    constructor(testValue: number) {
        super();

        this.testValue = testValue;
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