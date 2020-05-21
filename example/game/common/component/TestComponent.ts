import { Component } from '../../../src/common/Component';

interface NetworkedValueOptions {
    public: boolean;
    type: any;
}

function NetworkedValue(options?: NetworkedValueOptions) {
    return function(object: Object|Function, propertyName?: string) {
        const metadata = new ExposeMetadata(object instanceof Function ? object : object.constructor, propertyName, options || {});
        defaultMetadataStorage.addExposeMetadata(metadata);
    };
}

export class TestComponent extends Component
{
    @NetworkedValue({ public: true, type: Uint8Array })
    testValue!: number;

    allowMultiple(): boolean {
        return false;
    }
}