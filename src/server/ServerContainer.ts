import 'reflect-metadata';

import { IPublicRegistry, PublicRegistry } from './master/registry/PublicRegistry';
import { IWorkerRegistry, WorkerRegistry } from './master/registry/WorkerRegistry';
import { IMessageHandler, MessageHandler } from './master/MessageHandler';
import { Container } from 'inversify';
import { EdosServer } from './master/EdosServer';
import { TYPES } from './containerTypes';

export const edosServerContainer = new Container();

edosServerContainer.bind<IPublicRegistry>(TYPES.IPublicRegistry).to(PublicRegistry).inSingletonScope();
edosServerContainer.bind<IWorkerRegistry>(TYPES.IWorkerRegistry).to(WorkerRegistry).inSingletonScope();
edosServerContainer.bind<IMessageHandler>(TYPES.IMessageHandler).to(MessageHandler);
edosServerContainer.bind(TYPES.EdosServer).to(EdosServer);

export const edosServer = edosServerContainer.get<EdosServer>(TYPES.EdosServer);