import { Schema } from '@orbit/data';
import Store from '@orbit/store';

const schemaDefinition = {
  models: {
    planet: {
      attributes: {
        color: {
          r: { type: 'number' },
          g: { type: 'number' },
          b: { type: 'number' },
          a: { type: 'number' }
        },
        size: 'string'
      }
    },
    satellite: {
      attributes: {
        color: {
          r: { type: 'number' },
          g: { type: 'number' },
          b: { type: 'number' },
          a: { type: 'number' }
        },
        size: 'string'
      }
    },
    orbit: {
      attributes: {
        position: { type: 'number' }
      }
    }
  }
};

const schema = new Schema(schemaDefinition);
const store = new Store({ schema });

export default store;
