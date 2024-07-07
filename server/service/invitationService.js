
import { executeQuery } from './db.js';

import { getAllElementsQuery } from '../queries.js/queries.js'

export class InvitationService {

    async getAll(nameOfTable) {
        const query = getAllElementsQuery(nameOfTable, '*');
        const result = await executeQuery(query);
        return result;
    }
}
