import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TemplateService } from './template/template.service';
import { TemplateController } from './template/template.controller';
import { TemplateModule } from './template/template.module';


@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true, 
  }),
  MongooseModule.forRoot(process.env.DB_URI),
  TemplateModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
