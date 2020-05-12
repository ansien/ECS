import  { Engine } from '../src';
import { EventComponent } from './data/EventComponent';
import { TestEvent } from './data/TestEvent';

const engine = new Engine();

const testEventEntity = engine.createEntity(new EventComponent(5));

testEventEntity.emitEvent(new TestEvent(123));