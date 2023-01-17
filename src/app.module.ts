import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dataSource from './datasource';

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${environment}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => await dataSource.initialize(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
