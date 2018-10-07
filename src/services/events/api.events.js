import { slot, createEventBus } from 'ts-event-bus';

const APIEventsFactory = () => {
  return {
    updatedObject: slot(),
    deletedObjectById: slot()
  };
};

export function createAPIEventBus() {
  const eventBus = createEventBus({
    events: Object.assign({}, APIEventsFactory()),
    channels: []
  });

  const enhancedEventBus = {
    updatedObject: eventBus.updatedObject,
    deletedObjectById: eventBus.deletedObjectById,
    handleObjectUpdate: (instance) => {
      eventBus.updatedObject(instance);

      return instance;
    },
    handleObjectsUpdate: (instances) => {
      Promise.all(instances.map((i) => eventBus.updatedObject(i)));

      return instances;
    },
    handleObjectDeleteById: (id) => {
      eventBus.deletedObjectById(id);
      eventBus.deletedObjectById(id);
      eventBus.deletedObjectById(id);
    }
  };

  return enhancedEventBus;
}

export default APIEventsFactory;
