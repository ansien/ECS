import { ServerInstance } from '../../../src/server/master/ServerInstance';
import { ConnectActionHandler } from './action/ConnectActionHandler';

const serverInstance = new ServerInstance({
    port: 3030
});

serverInstance.registerActionHandler(ConnectActionHandler);