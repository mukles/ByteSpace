import type { AuthenticatedUser } from "../auth/auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
      accessToken?: string;
    }
  }
}
