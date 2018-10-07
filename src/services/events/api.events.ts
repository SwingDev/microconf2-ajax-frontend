import { slot, createEventBus, EventDeclaration } from 'ts-event-bus';

export type APIEventHandler<T = unknown> = (requestData: T) => void | Promise<void>;
export type APIEventUnsubscribe = () => void;

export interface APIEventSlot<T> {
  (requestData: T): Promise<void>;
  on: (handler: APIEventHandler<T>) => APIEventUnsubscribe;
}

export interface APIEventBusSlots<T> {
  updatedObject: APIEventSlot<T>;
  deletedObjectById: APIEventSlot<string>;
}

export interface APIEventBusHelpers<T> {
  handleObjectUpdate: (instance: T) => Promise<T>;
  handleObjectsUpdate: (instances: T[]) => Promise<T[]>;
  handleObjectDeleteById: (id: string) => Promise<void>;
}

const APIEventsFactory = <T>(): APIEventBusSlots<T> => {
  return {
    updatedObject: slot<T>(),
    deletedObjectById: slot<string>()
  };
};

export type APIEventBus<T> = APIEventBusSlots<T> & APIEventBusHelpers<T>;

export function createAPIEventBus<T>(): APIEventBus<T> {
  const eventBus: EventDeclaration = createEventBus({
    events: { ...APIEventsFactory<T>() },
    channels: []
  });

  const enhancedEventBus: APIEventBus<T> = {
    updatedObject: eventBus.updatedObject,
    deletedObjectById: eventBus.deletedObjectById,
    handleObjectUpdate: async (instance: T): Promise<T> => {
      eventBus.updatedObject(instance);

      return instance;
    },
    handleObjectsUpdate: async (instances: T[]): Promise<T[]> => {
      Promise.all(
        instances.map((i: T) => eventBus.updatedObject(i))
      );

      return instances;
    },
    handleObjectDeleteById: async (id: string): Promise<void> => {
      eventBus.deletedObjectById(id);
      eventBus.deletedObjectById(id);
      eventBus.deletedObjectById(id);
    }
  };

  return enhancedEventBus;
}

export default APIEventsFactory;
