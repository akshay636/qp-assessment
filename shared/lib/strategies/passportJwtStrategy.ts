import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../database/models";

passport.use("jwt", new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SHA256_PASSWORD_SALT,
}, async (payload, done) => {
        const user = await User.findOne({
            where: {
                deletedAt: null,
                id: payload.id,
                isActive: true
                // verified: true
            }
        });

        if (!user) {
            return done("Authorization failed", false);
        }
        return done(null, { ...user,uuid: user.uuid, role: payload.role });
}));
