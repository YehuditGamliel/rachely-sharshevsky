import { InvitationService } from '../service/InvitationService.js';

export class InvitationController {

    async getAll(req, res, next) {
        try {
            const invitationService = new InvitationService()
            const resultItem = await invitationService.getAll(req.params.paper);
            if (resultItem.length != 0) {
                res.json({ data: resultItem });
            }
        }
        catch (ex) {
            next({statusCode: ex.errno || 500, message:ex.message || ex})

        }
    }

}