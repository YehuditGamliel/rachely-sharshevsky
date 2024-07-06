
import { executeQuery } from './db.js';

import {  getAllElementsQuery } from '../queries.js/queries.js'

export class InvitationService {

    async getAll(nameOtTable) {
        const query = getAllElementsQuery(nameOtTable, '*');
        const result = await executeQuery(query);
        return result;
    }
}
