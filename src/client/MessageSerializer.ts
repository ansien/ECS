import { Action } from '../common/Action';
import { MetadataStorage } from '../common/metadata/MetadataStorage';
import { ActionMessageEnvelope, MESSAGE_TYPE } from '../common/types';

export class MessageSerializer
{
    public static serializeAction(action: Action): string {
        const serializedAction = action.serialize();

        const actionMetadata = MetadataStorage.getInstance().getActionMetadata(action);
        if (!actionMetadata) throw new Error(`Provided action ${Action.name} is not registered.`);

        const actionMessage: ActionMessageEnvelope = [
            MESSAGE_TYPE.ACTION,
            actionMetadata.options.id,
            ...Object.values(serializedAction)
        ]

        return JSON.stringify(actionMessage);
    }
}
