import 'dotenv/config'
import { Schema, createConnection } from "mongoose";
import { User } from './types';

export const connection = createConnection(process.env.MONGODB_URI ?? "")

export const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: [String], required: true },
  asset: { type: Number, required: true }
})

export const RectangleModel = connection.model<User>('rectangle', userSchema)
