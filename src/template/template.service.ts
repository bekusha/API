import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from 'src/model/template.model';
import Handlebars from 'handlebars';

@Injectable()
export class TemplateService {
    
    constructor(@InjectModel('Template') private readonly templateModel: Model<Template>) {}


    compile(template: Template, data: any): string {
      const htmlSource = template.htmlSource;

try {

  const compiledTemplate = Handlebars.compile(htmlSource)(data);
  return compiledTemplate;
} catch (error) {
  throw new Error('Error compiling template');
}
    }

    async getAllTemplates(): Promise<Template[]> {
      return await this.templateModel.find().lean().exec();
   }

   

    async createTemplate(template: Template): Promise<Template> {
      try {
        const newTemplate = new this.templateModel(template);
        return await newTemplate.save();
      } catch (error) {
        
        throw new Error('Error creating template');
      }
    }

    async updateTemplate(id: string, template: Template): Promise<Template | null> {
      const updatedTemplate = await this.templateModel.findByIdAndUpdate(id, template, { new: true });
    
      if (!updatedTemplate) {
        throw new Error('Template not found or could not be updated.');
      }
    
      return updatedTemplate;
    }

    async deleteTemplate(id: string): Promise<void>{
      await this.templateModel.findByIdAndDelete(id);
    }

    async findOne(id: string): Promise<any> {
      const template = await this.templateModel.findById(id).exec();
      if (!template) {
          throw new Error(`Template with ID ${id} not found`);
      }
      return template;
  }
  
}
