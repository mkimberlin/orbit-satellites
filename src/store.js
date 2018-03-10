import { Schema } from '@orbit/data';
import Store from '@orbit/store';

const schemaDefinition = {
  models: {
    planet: {
      attributes: {
        label: 'string',
        size: 'number',
        color: {
          r: { type: 'number' },
          g: { type: 'number' },
          b: { type: 'number' },
          a: { type: 'number' }
        }
      }
    },
    satellite: {
      attributes: {
        label: 'string',
        orbit: 'number',
        size: 'number',
        color: {
          r: { type: 'number' },
          g: { type: 'number' },
          b: { type: 'number' },
          a: { type: 'number' }
        }
      }
    }
  }
};

const schema = new Schema(schemaDefinition);
const store = new Store({ schema });

export default store;
