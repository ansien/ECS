import { ClientEngine } from '../../../src/client/ClientEngine';
import { ConnectAction } from '../common/action/ConnectAction';

(async () => {
    const clientEngine = new ClientEngine();

    const connectResult = await clientEngine.connect('ws://127.0.0.1:3030');
    console.log('@c', connectResult);

    const actionResult = await clientEngine.sendAction(new ConnectAction('TEST_JWT'));
    console.log('@a', actionResult);
})();