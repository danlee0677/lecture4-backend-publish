import 'dotenv/config'
import { Schema, createConnection } from "mongoose";
import { User } from './types';

export const connection = createConnection(process.env.MONGODB_URI ?? "")

export const userSchema = new Schema<User>({
  
})

export const RectangleModel = connection.model<User>('rectangle', userSchema)
