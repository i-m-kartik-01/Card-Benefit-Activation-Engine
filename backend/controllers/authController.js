import { google } from "googleapis";
import oauth2Client from "../services/gmailService.js";

export const googleLogin = (req, res) => {

    const url = oauth2Client.generateAuthUrl({

        access_type: "offline",

        prompt: "consent",

        scope: [

            "openid",

            "email",

            "profile",

            "https://www.googleapis.com/auth/gmail.readonly"

        ]

    });

    res.redirect(url);

};

export const googleCallback = async (req, res) => {

    try {

        const { code } = req.query;

        const { tokens } =
            await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);

        const gmail = google.gmail({

            version: "v1",

            auth: oauth2Client

        });

        const profile =
            await gmail.users.getProfile({

                userId: "me"

            });

        console.log("TOKENS");
        console.log(tokens);

        console.log("PROFILE");
        console.log(profile.data);

        res.json({
            success: true,
            email: profile.data.emailAddress,
            message: "Google account connected successfully."
        });

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            error:err.message

        });

    }

};