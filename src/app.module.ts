import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true, 
  }),
  MongooseModule.forRoot(process.env.DB_URI),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
