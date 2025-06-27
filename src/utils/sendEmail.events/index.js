
import { EventEmitter } from 'events';
import { sendEmail } from '../../services/sendEmail.js';
import { nanoid , customAlphabet } from 'nanoid';
import { userModel } from '../../DB/models/index.js';
import { Hash } from '../Hash/index.js';
import { templateEmail } from '../../services/template-email.js';

export const eventEmitter = new EventEmitter()



eventEmitter.on("sendEmailConfirmation", async (data) => {
     // send email notification
    const { email } = data;
    //generate otp
    const otp = customAlphabet('1234567890', 4)()
    const hash = await Hash({ key: otp, SALT_ROUNDS: process.env.SALT_ROUNDS })
    await userModel.updateOne({ email }, {  otp : hash })
    await sendEmail(email, "confirm email", "Your OTP Code", templateEmail({otp}))

})