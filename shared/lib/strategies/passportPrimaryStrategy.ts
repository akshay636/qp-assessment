import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../database/models";


const primaryAuth = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SHA256_PASSWORD_SALT,
}, async (payload, done) => {

    let user: any = await User.findOne({
        where: {
            deletedAt: null,
            uuid: payload.uuid,
        }
    });
    if (!user) {
        return done("Authorization failed", false);
    }
    return done(null, { ...user, uuid: user.uuid, role: payload.role, userType: payload.userType });
});

passport.use("user_local", primaryAuth);