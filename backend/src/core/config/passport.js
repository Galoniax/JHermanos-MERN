import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { ErrorResponse } from "../errors/error-handler.js";
import User from "../models/User.js";
import {
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "./config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email)
          return done(new ErrorResponse("Email de Google no encontrado", 400));

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            provider: "GOOGLE",
            avatar_url: profile.photos?.[0]?.value || "",
          });
        }

        if (!user.active) {
          return done(new ErrorResponse("Usuario inactivo", 403));
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

export default passport;
