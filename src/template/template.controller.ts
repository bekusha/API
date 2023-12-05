import { Body, Controller, Get, Param, Post, Put, Delete, Render, HttpStatus, HttpException, Query } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Template } from 'src/model/template.model';




@Controller('templates')
export class TemplateController {
  constructor(private  templateService: TemplateService) {}

  @Get('list')
 async getAllTemplates() {
    try {
      const templates = await this.templateService.getAllTemplates();
      return templates ;
    } catch (error) {
      throw new HttpException('Error fetching templates', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


@Post(':id/html')
@Render('template')
async compileTemplate(
  @Param('id') id: string,
  @Body() jsonData: any,
): Promise<any> {
  try {
    const template = await this.templateService.findOne(id);

    if (!template) {
      throw new HttpException('Template not found', HttpStatus.NOT_FOUND);
    }

    const compiledResult = this.templateService.compile(template, jsonData);
    return { htmlSource: compiledResult };
  } catch (error) {
  throw new HttpException('Error compiling template', HttpStatus.INTERNAL_SERVER_ERROR, jsonData);
  }
}


@Post('create')
async createTemplate(@Body() template: Template): Promise<Template> {
  const createdTemplate = await this.templateService.createTemplate(template);
  return createdTemplate;
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
