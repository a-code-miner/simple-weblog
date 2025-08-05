import passport from "passport";
import { Strategy } from 'passport-local'
import bcrypt from "bcryptjs";

import User from "../models/User";

passport.use(new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return done(null, false, { message: 'کاربری با این ایمیل ثبت نشده است.' })
        }
        const isMatch = await bcrypt.compare(passport, user.password)
        if (isMatch) {
            return done(null, user) // req.user
        } else {
            return done(null, false, { message: 'نام کاربری یا رمز عبور صحیح نمی‌باشد!' })
        }
    } catch (err) {
        console.log(err)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
