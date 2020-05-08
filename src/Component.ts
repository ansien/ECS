export abstract class Component
{
    abstract serialize(): string;
    abstract deserialize(serializedData: string): void;
    abstract allowMultiple: boolean;
}