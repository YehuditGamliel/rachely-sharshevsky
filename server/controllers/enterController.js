

import { EnterService } from '../service/enterService.js'
import { userSchema } from '../validateData/validateUser.js';
import { sendStyledEmail } from '../emailSender.js';

export class EnterController {

    async Authentication(req, res, next) {
        try {
            const enterService = new EnterService();
            const result = await enterService.Authentication(req.body)
            if (result.verifyPassword == true) {
                res.cookie('x-access-token', result.token, { httpOnly: true }).json({ email: result.email, role: result.role, token: result.token });
            }
        } catch (ex) {
            next({ statusCode: ex.errno || 500, message: ex.message || ex })
        }
    }

    async addUser(req, res, next) {
        try {
            const enterService = new EnterService()
            const result = await enterService.createUser(req.body);
            sendStyledEmail(req.body.email, "להשלמת תהליך הרישום מצורך סיסמא חד פמית ", result.otpGenerated)
            res.cookie('x-access-token', result.token, { httpOnly: true }).json({ data:result, token: result.token });

        }
        catch (ex) {
            next({ statusCode: ex.errno === 1062 ? 409 : 500, message: ex.message || ex });
        }

    }

    verifyUserName = async (req, res) => {
        const { userName, otp } = req.body;
        try {
            const enterService = new EnterService();
            const user = await enterService.validateUserSignUp(userName, otp);
            res.json({ data: user });
        }
        catch (ex) {
            next({ statusCode: ex.errno || 500, message: ex.message || ex })
        }
    };
}
