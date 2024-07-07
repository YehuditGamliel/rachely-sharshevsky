

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
        const { error } = userSchema.validate(req.body)
        if (error) {

            res.status(400).json({ status: 400, error: "Incorrect data" })
        }
        try {
            const enterService = new EnterService();
            const user = await enterService.checkUserName(req.body)
            const result = await enterService.createUser(req.body);
            console.log("req.body.email", req.body.email, result.otpGenerated, req.body.email)
            sendStyledEmail(req.body.email, "להשלמת תהליך הרישום מצורך סיסמא חד פמית ", result.otpGenerated)
            return res.json({ data: result });
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
            res.status(200).json({ status: 200, data: user });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    };

    async updatePassword(req, res, next) {
        try {
            const enterService = new EnterService();
            const result = await enterService.updatePassword(req.body)
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
