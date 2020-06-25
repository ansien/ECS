import { ConnectActionHandler } from './action/ConnectActionHandler';
import { edosServer } from '../../../src/server/ServerContainer';

edosServer.registerActionHandler(ConnectActionHandler);

edosServer.start({
    port: 3030
});
