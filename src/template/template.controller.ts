import { Body, Controller, Get, Param, Post, Put, Delete, Render, HttpStatus, HttpException } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Template } from 'src/model/template.model';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  @Render('template') 
  async getAllTemplates() {
    try {
      const templates = await this.templateService.getAllTemplates();
      console.log(templates)
      return { templates };
    } catch (error) {
      throw new HttpException('Error fetching templates', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/new')
  async createTemplate(@Body() template: Template): Promise<Template> {
    try {
      const createdTemplate = await this.templateService.createTemplate(template);
      return createdTemplate;
    } catch (error) {
      throw new HttpException('Error creating template', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateTemplate(@Param('id') id: string, @Body() template: Template): Promise<Template> {
    try {
      const updatedTemplate = await this.templateService.updateTemplate(id, template);
      return updatedTemplate;
    } catch (error) {
      throw new HttpException('Error updating template', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteTemplate(@Param('id') id: string): Promise<void> {
    try {
      await this.templateService.deleteTemplate(id);
    } catch (error) {
      throw new HttpException('Error deleting template', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
