
import { executeQuery } from './db.js';
import {getByValues,getByValueQuery, addQuery,updateSpecificFieldQuery,addaspecialQuery } from './queries.js'
//import jsonData from '../../client/src/assets/data.json'
import { generateOTP } from'../service/generateOTP.js';
// const { encrypt } = require('../services/crypto');
// const { generateOTP } = require('../services/OTP'); 
import jwt from 'jsonwebtoken';
// import jwt from "jsonwebtoken"
// import sensEmail from '../sendEmail.js'
import { sendStyledEmail } from '../emailSender.js';

export class LoginService {

    async validateUserSignUp(userName, otp){
        console.log(userName, otp)  
          const query = getByValueQuery('users',  'userName','*');
        const user = await executeQuery(query, [userName]);
       console.log("😊",user,user.length === 0)
       if(user.length === 0){
            return [false, 'User not found'];
        }
         if (user[0].otp!==otp) {
           
            return [false, 'Invalid OTP'];
        }
          const query2 =  updateSpecificFieldQuery('users', 'userName', 'active=1') 
          const result = await executeQuery(query, [userName]);
         
          return [true, result];
    
    }
    async Authentication(data) {
        console.log(data)
        const query = getByValues('manager','email',['userName','password']);
        console.log("result:",query)
        const result = await executeQuery(query, Object.values(data));
        console.log("result:",result)
        const token = jwt.sign({ id: data.userName }, "privateKey", { expiresIn: '20m' });
        return {userName:result[0].email,token:token};
        //return result;
        //return {token ,refreshtoken};
    }
    // לסדר מכאן
    async AuthenticationManager(data) {
        console.log("data",Object.values(data),data,Object.keys(data))
        const query = getByValues('manager','email',['userName','password']);
        const result = await executeQuery(query, Object.values(data));
        console.log("😍",result[0].email)
        const token = jwt.sign({ id:result[0].email }, "privateKey", { expiresIn: '20m' });
        return {email:result[0].email,token:token};
        // return result;
        // //return {token ,refreshtoken};
    }
 
    async checkUserName(userName){ 
       const query = getByValueQuery('users',  'userName','email');
       const result = await executeQuery(query, [userName]);
       console.log(result,userName)
       return result;
   }

  
//   
   

    // async validateUserSignUp(userName, otp) {

        
      
    // }
    createUser = async (itemDetailes) => {

       
        // const hashedPassword = await encrypt(itemDetailes.password);
        const otpGenerated = generateOTP();
        const query = addaspecialQuery('users',Object.keys(itemDetailes),'otp');
        const newUser = await executeQuery(query, [...Object.values(itemDetailes),otpGenerated]);
        console.log(Object.values(itemDetailes),otpGenerated)
        console.log(itemDetailes.email,"ppp",otpGenerated)
        // try {
             sendStyledEmail(itemDetailes.email,"ppppp",otpGenerated)
        // }
        if (!newUser) {
            return [false, 'Unable to sign you up'];
          }
          return [true, newUser];
        // catch{
            
        // }
        // return {email:result[0].email,token:token};
        return result;
    }
      
     
}