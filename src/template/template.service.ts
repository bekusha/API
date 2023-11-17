import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from 'src/model/template.model';

@Injectable()
export class TemplateService {
    
    constructor(@InjectModel('Template') private readonly templateModel: Model<Template>) {}

    async getAllTemplates(): Promise<Template[]>{
        return this.templateModel.find().exec();
    }

    async createTemplate(template: Template): Promise<Template>{
        const newTemplate = new this.templateModel(template);
        console.log(newTemplate)
        return newTemplate.save();

    }

    async updateTemplate(id: string, template: Template): Promise<Template>{
        return this.templateModel.findByIdAndUpdate(id, template, {new:true})
    }

    async deleteTemplate(id: string): Promise<void>{
        await this.templateModel.findByIdAndDelete(id);
    }
}
