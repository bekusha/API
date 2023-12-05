import * as mongoose from 'mongoose';

export const TemplateSchema = new mongoose.Schema({
  name: String,
  jsonData: { type: String, default: null },
  htmlSource: String,
});

export interface Template extends mongoose.Document {
  name: string;
  jsonData?: string | null;
  htmlSource: string;
}
