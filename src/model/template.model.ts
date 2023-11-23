import * as mongoose from 'mongoose';

export const TemplateSchema = new mongoose.Schema({
  name: String,
  content: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: Number,
  address: String,
});

export interface Template extends mongoose.Document {
  name: string;
  content: string;
  firstName: number;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}
