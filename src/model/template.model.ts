import * as mongoose from 'mongoose'

export const TemplateSchema = new mongoose.Schema({
    name: String,
    content: String
})

export interface Template extends mongoose.Document{
    name: string;
    content: string;
}