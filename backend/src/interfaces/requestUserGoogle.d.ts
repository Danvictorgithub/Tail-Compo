import { User } from "@prisma/client";
import { GoogleOAuthPayload } from "./googleOAuthPayload";

declare interface RequestUserGoogle {
    user: GoogleOAuthPayload
}