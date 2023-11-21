import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from 'src/model/template.model';

@Injectable()
export class TemplateService {
    
    constructor(@InjectModel('Template') private readonly templateModel: Model<Template>) {}

    async getAllTemplates(): Promise<Template[]>{
       let templates = await this.templateModel.find().exec();
       return templates;
    }

    async createTemplate(template: Template): Promise<Template> {
    const newTemplate = new this.templateModel(template);
    return newTemplate.save();
  }

    async updateTemplate(id: string, template: Template): Promise<Template>{
        return this.templateModel.findByIdAndUpdate(id, template, {new:true})
    }

    async deleteTemplate(id: string): Promise<void>{
      await this.templateModel.findByIdAndDelete(id);
    }

    async findOne(id: string): Promise<any> {
        return  await this.templateModel.findById(id).exec();
      }
}
