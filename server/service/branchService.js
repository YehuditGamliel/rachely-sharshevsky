
import { executeQuery } from './db.js';

import { getAllElementsQuery } from './queries.js'

export class BranchService {

    async getAllBranches() {
        const query = getAllElementsQuery('branches', '*');
        const result = await executeQuery(query);
        return result;
    }
}
