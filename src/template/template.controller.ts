import { Body, Controller, Get, Param, Post, Put, Delete, Render, HttpStatus, HttpException } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Template } from 'src/model/template.model';
import DOMPurify from 'dompurify';




@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get('list')
 async getAllTemplates() {
    try {
      const templates = await this.templateService.getAllTemplates();
      
      return templates ;
    } catch (error) {
      throw new HttpException('Error fetching templates', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  

 
 @Get(':id/html')
 
 @Render('template')
 async findOne(@Param('id') id: string) {
 
  try {
    let template = await this.templateService.findOne(id);
    console.log(template)
    return  template ;
   } catch (error) {
    throw new HttpException('Error fetching template', HttpStatus.INTERNAL_SERVER_ERROR);
   }
 }

  @Post('')
async createTemplate(@Body() template: Template): Promise<Template> {
  try {
    const createdTemplate = await this.templateService.createTemplate(template);
    return createdTemplate;
  } catch (error) {
    throw new HttpException('Error creating template', HttpStatus.BAD_REQUEST);
  }
}


  @Put(':id')
  async updateTemplate(@Param('id') id: string, @Body() template: Template): Promise<Template> {
    try {
      const updatedTemplate = await this.templateService.updateTemplate(id, template);
      console.log(updatedTemplate)
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
