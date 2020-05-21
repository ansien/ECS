import { ServerInstance } from '../../../src/server/ServerInstance';
import { ConnectActionHandler } from './action/ConnectActionHandler';

console.log('@start');

const serverInstance = new ServerInstance({
    port: 3030
});

serverInstance.registerActionHandlers(
    new ConnectActionHandler
);