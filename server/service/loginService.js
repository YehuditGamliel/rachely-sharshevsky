import { executeQuery } from './db.js';
import { getByValue,getByValueQuery, addQuery,updateSpecificFieldQuery,updateQuery } from './queries.js'
import otpGenerator from 'otp-generator';
// import jwt, { verify } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import bcrypt from'bcryptjs';
import { sendStyledEmail } from '../emailSender.js';

const generateOTP = () => {
    const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    var salt = bcrypt.genSaltSync(10);
    var hashOtp = bcrypt.hashSync(OTP, salt);
    return [OTP,hashOtp];
};

export class LoginService {
    async validateUserSignUp(userName, otp) {
        const query = getByValueQuery('users', 'userName', '*');
        const user = await executeQuery(query, [userName]);
        if (user.length === 0) {
            return [false, 'User not found'];
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(otp, user[0].otp, async function (err, result) {
                console.log("rs",result)
                if (err || !result) {
                    resolve([false, 'Invalid OTP']);
                } else {
                    
                    const query2 = updateSpecificFieldQuery('users', 'userName', 'isActive=1');
                    const result = await executeQuery(query2, [userName]);
                    resolve([true, result]);
                }
            });
        });
    }
 
    async Authentication(data) {
        const query = getByValue('users', 'hashPassword,role,email', 'userName');
        const resultData = await executeQuery(query, [data.userName]); 
        const verificationResult = await bcrypt.compare(data.password, resultData[0].hashPassword);
        if(verificationResult){
            const token = jwt.sign({ username: data.userName }, "privateKey", { expiresIn: '500m' });
            return {verifyPassword:verificationResult,token:token,role: resultData[0].role,email:resultData[0].email}; 
        }
        else {
            return {verifyPassword:verificationResult}
            // [false, 'Incorrect Password']
        }
    }

    async checkUserName(userName){ 
       const query = getByValueQuery('users',  'userName','email');
       const result = await executeQuery(query, [userName]);
       return result;
    }
 
    createUser = async (itemDetailes) => { 
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(itemDetailes.password, salt);
        const { password, ...itemDetailsWithoutPassword } = itemDetailes;
        const keysWithoutPassword = Object.keys(itemDetailsWithoutPassword);
        const valuesWithoutPassword = Object.values(itemDetailsWithoutPassword); 
        const [otpGenerated,hashOtp] = generateOTP();
        const query = addQuery('users',[...keysWithoutPassword,'otp','hashPassword']);
        const newUser = await executeQuery(query, [...valuesWithoutPassword,hashOtp,hash]);
        sendStyledEmail(itemDetailes.email,"להשלמת תהליך הרישום מצורך סיסמא חד פמית ",otpGenerated)
        if (!newUser) {
            return [false, 'Unable to sign you up'];
        }
        return [true, newUser];
    }

    async updatePassword(body){ 
        const query = updateQuery('users',  'userName', body.password);
        const result = await executeQuery(query, [userName]);
        return result;
    }
  
}

//import jsonData from '../../client/src/assets/data.json'
// import { generateOTP } from'../service/generateOTP.js';
// const { encrypt } = require('../services/crypto');
// const { generateOTP } = require('../services/OTP'); 
// import jwt from "jsonwebtoken"
// import sensEmail from '../sendEmail.js'
   // async validateUserSignUp(userName, otp){
    //     console.log(userName, otp)  
    //       const query = getByValueQuery('users',  'userName','*');
    //     const user = await executeQuery(query, [userName]);
    // //    console.log("😊",user,user.length === 0)
    //    if(user.length === 0){
    //         return [false, 'User not found'];
    //     }
    //     const   comparePasswords =  new Promise((resolve, reject) => {
    //         bcrypt.compare(otp, user[0].otp, function(err, result) {
    //             if (!err && !result) {
    //                 return [false, 'Invalid OTP'];
    //                 // const token = jwt.sign({ id: data.userName }, "privateKey", { expiresIn: '20m' });
    //                 // resolve([true, token]);
    //             } 
    //             else {
    //                 const query2 =  updateSpecificFieldQuery('users', 'userName', 'active=1') 
    //                 const result = await executeQuery(query, [userName]);
                   
    //                 return [true, result];
    //             }
    //         });
    //     });
        //  if (user[0].otp!==otp) {
           
        //     return [false, 'Invalid OTP'];
        // }


        // לסדר מכאן
    // async AuthenticationManager(data) {
    //     console.log("data",Object.values(data),data,Object.keys(data))
    //     const query = getByValues('manager','email',['userName','password']);
    //     const result = await executeQuery(query, Object.values(data));
    //     console.log("😍",result[0].email)
    //     const token = jwt.sign({ id:result[0].email }, "privateKey", { expiresIn: '20m' });
    //     return {email:result[0].email,token:token};
    //     // return result;
    //     // //return {token ,refreshtoken};
    // }
        