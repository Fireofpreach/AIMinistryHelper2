import { User } from "../your-user-model-path"; // Update this import if you have a User type/interface

declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace 'any' with 'User' if you have a type
    }
  }
}
